from datetime import timezone, datetime
from ..extensions import db

class Post(db.Model):
    __tablename__ = 'post'

    # Primary key for the Post model
    id: db.Mapped[int] = db.mapped_column(primary_key=True)

    # Foreign key linking to the User model (typo in 'ForeignKey')
    user_id: db.Mapped[int] = db.mapped_column(db.ForeignKey('user.id'))

    # Text content of the post (cannot be empty)
    content: db.Mapped[str] = db.mapped_column(db.Text, nullable=False)

    # Type of media, e.g., image, video (typo in 'nullable')
    media_type: db.Mapped[str] = db.mapped_column(db.String(200), nullable=False)

    # URL where the media is stored
    media_url: db.Mapped[str] = db.mapped_column(db.String(200), nullable=False)

    # Timestamp when the post is created
    created_at = db.Column(db.DateTime, default=datetime.now(timezone.utc))

    # Timestamp for the last update
    updated_at = db.Column(
        db.DateTime,
        default=datetime.now(timezone.utc),
        onupdate=datetime.now(timezone.utc)
    )


    user = db.relationship('User', back_populates='posts')

