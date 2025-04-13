from ..extensions import db


class User(db.Model):
    __tablename__ = "user"

    id: db.Mapped[int] = db.mapped_column(primary_key=True)
