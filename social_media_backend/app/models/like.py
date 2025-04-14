from ..extensions import db
from datetime import timezone, datetime

class Like(db.Model):
    __tablename__ = "like"

    user_id: db.Mapped[int] = db.mapped_column(db.ForeignKey('user.id'), primary_key=True)
    post_id: db.Mapped[int] = db.mapped_column(db.ForeignKey('post.id'), primary_key=True)
    created_at: db.Mapped[datetime] = db.mapped_column(db.DateTime, default=datetime.now(timezone.utc))

    user = db.relationship('User', back_populates='likes')
    post = db.relationship('Post', backref='likes')
