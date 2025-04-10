from ..extensions import db
from sqlalchemy.orm import Mapped, mapped_column

class User(db.Model):
    __tablename__ = "users"

    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(unique=True, nullable=False)
    email: Mapped[str] = mapped_column(unique=True, nullable=False)

    def to_json(self):
        return {
            "id":self.id,
            "name": self.name,
            "email": self.email
        }