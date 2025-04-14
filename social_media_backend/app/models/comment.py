from datetime import datetime, timezone
from ..extensions import db

class Comment(db.Model):
    __tablename__ = 'comment'

    id: db.Mapped[int] = db.mapped_column(db.Integer, primary_key=True)
    content: db.Mapped[str] = db.mapped_column(db.Text, nullable=False)
    user_id: db.Mapped[int] = db.mapped_column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    post_id: db.Mapped[int] = db.mapped_column(db.Integer, db.ForeignKey('post.id'), nullable=False)
    created_at: db.Mapped[datetime] = db.mapped_column(db.DateTime, default=datetime.now(timezone.utc))

    user = db.relationship('User', backref='comments')
    post = db.relationship('Post', backref='comments')
    likes = db.relationship('CommentLike', back_populates='comment', lazy='dynamic')