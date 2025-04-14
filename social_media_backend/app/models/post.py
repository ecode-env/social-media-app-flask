from datetime import datetime, timezone
from ..extensions import db

class Post(db.Model):
    __tablename__ = 'post'

    id: db.Mapped[int] = db.mapped_column(primary_key=True)

    # User who created the post
    user_id: db.Mapped[int] = db.mapped_column(db.ForeignKey('user.id'), nullable=False)

    # Optional title field for articles
    title: db.Mapped[str] = db.mapped_column(db.String(255), nullable=True)

    # Required text content of the post
    content: db.Mapped[str] = db.mapped_column(db.Text, nullable=False)

    # Optional media fields: if provided, can be used to store image/video information
    media_type: db.Mapped[str] = db.mapped_column(db.String(200), nullable=True)
    media_url: db.Mapped[str] = db.mapped_column(db.String(200), nullable=True)

    # Timestamp when the post is created
    created_at: db.Mapped[datetime] = db.mapped_column(
        db.DateTime(timezone=True), default=lambda: datetime.now(timezone.utc)
    )

    # Timestamp for the last update
    updated_at: db.Mapped[datetime] = db.mapped_column(
        db.DateTime(timezone=True),
        default=lambda: datetime.now(timezone.utc),
        onupdate=lambda: datetime.now(timezone.utc)
    )

    # Relationship: each post has one author (User)
    author = db.relationship('User', back_populates='posts')

    def to_json(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "title": self.title,
            "content": self.content,
            "media_type": self.media_type,
            "media_url": self.media_url,
            "created_at": self.created_at.isoformat() if self.created_at else None,
            "updated_at": self.updated_at.isoformat() if self.updated_at else None,
            "author": self.author.username if self.author else None
        }
