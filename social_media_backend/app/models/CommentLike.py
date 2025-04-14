from ..extensions import db
from datetime import datetime, timezone

class CommentLike(db.Model):
    __tablename__ = 'comment_like'

    user_id: db.Mapped[int] = db.mapped_column(db.ForeignKey('user.id'), primary_key=True)
    comment_id: db.Mapped[int] = db.mapped_column(db.ForeignKey('comment.id'), primary_key=True)
    created_at: db.Mapped[datetime] = db.mapped_column(db.DateTime, default=datetime.now(timezone.utc))

    user = db.relationship('User', backref='comment_likes')
    comment = db.relationship('Comment', backref='likes')
