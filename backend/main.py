from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordRequestForm

from sqlalchemy.orm import Session
from pydantic import BaseModel

from database import engine, Base, SessionLocal
import models

from auth import (
    verificar_senha,
    criar_token,
    verificar_token,
    ADMIN_USERNAME,
    ADMIN_PASSWORD
)


# Criar tabelas do banco
Base.metadata.create_all(bind=engine)


# Criar aplicação
app = FastAPI()


# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Conexão com banco
def get_db():
    db = SessionLocal()

    try:
        yield db
    finally:
        db.close()


# Rota principal
@app.get("/")
def root():
    return {
        "message": "Backend do site Décio funcionando!"
    }


# Login do administrador
@app.post("/api/login")
def login(
    form_data: OAuth2PasswordRequestForm = Depends()
):
    if form_data.username != ADMIN_USERNAME:
        raise HTTPException(
            status_code=401,
            detail="Usuário ou senha inválidos"
        )

    if not verificar_senha(
        form_data.password,
        ADMIN_PASSWORD
    ):
        raise HTTPException(
            status_code=401,
            detail="Usuário ou senha inválidos"
        )

    token = criar_token({
        "sub": ADMIN_USERNAME
    })

    return {
        "access_token": token,
        "token_type": "bearer"
    }


# Modelo para criação/edição de notícia
class NoticiaCreate(BaseModel):
    titulo: str
    conteudo: str


# Listar notícias
# Público
@app.get("/api/noticias")
def listar_noticias(
    db: Session = Depends(get_db)
):
    noticias = db.query(models.Noticia).all()

    return noticias


# Criar notícia
# Protegido por login
@app.post("/api/noticias")
def criar_noticia(
    noticia: NoticiaCreate,
    db: Session = Depends(get_db),
    usuario: str = Depends(verificar_token)
):
    nova_noticia = models.Noticia(
        titulo=noticia.titulo,
        conteudo=noticia.conteudo
    )

    db.add(nova_noticia)
    db.commit()
    db.refresh(nova_noticia)

    return nova_noticia


# Atualizar notícia
# Protegido por login
@app.put("/api/noticias/{noticia_id}")
def atualizar_noticia(
    noticia_id: int,
    noticia: NoticiaCreate,
    db: Session = Depends(get_db),
    usuario: str = Depends(verificar_token)
):
    noticia_existente = db.query(
        models.Noticia
    ).filter(
        models.Noticia.id == noticia_id
    ).first()

    if noticia_existente is None:
        return {
            "erro": "Notícia não encontrada"
        }

    noticia_existente.titulo = noticia.titulo
    noticia_existente.conteudo = noticia.conteudo

    db.commit()
    db.refresh(noticia_existente)

    return noticia_existente


# Excluir notícia
# Protegido por login
@app.delete("/api/noticias/{noticia_id}")
def excluir_noticia(
    noticia_id: int,
    db: Session = Depends(get_db),
    usuario: str = Depends(verificar_token)
):
    noticia_existente = db.query(
        models.Noticia
    ).filter(
        models.Noticia.id == noticia_id
    ).first()

    if noticia_existente is None:
        return {
            "erro": "Notícia não encontrada"
        }

    db.delete(noticia_existente)
    db.commit()

    return {
        "message": "Notícia excluída com sucesso!"
    }