from datetime import datetime, timezone
from ..extensions import db

class Comment(db.Model):
    __tablename__ = 'comment'

    id: db.Mapped[int] = db.mapped_column(db.Integer, primary_key=True)
    content: db.Mapped[str] = db.mapped_column(db.Text, nullable=False)
    user_id: db.Mapped[int] = db.mapped_column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    post_id: db.Mapped[int] = db.mapped_column(db.Integer, db.ForeignKey('post.id'), nullable=False)
    created_at: db.Mapped[datetime] = db.mapped_column(db.DateTime, default=datetime.now(timezone.utc))

    user = db.relationship('User', back_populates='comments')
    post = db.relationship('Post', back_populates='comments')
    likes = db.relationship(
        'CommentLike',
        back_populates='comment',
        lazy='dynamic',
        cascade='all, delete-orphan'
    )

    def serialize(self, current_user_id=None):
        return {
            'id': self.id,
            'content': self.content,
            'user_id': self.user_id,
            'post_id': self.post_id,
            'fullName': f"{self.user.f_name} {self.user.l_name}",
            'username': self.user.username,
            'created_at': self.created_at.isoformat(),
            'likes_count': self.likes.count(),
            'is_liked_by_user': self.likes.filter_by(user_id=current_user_id).first() is not None if current_user_id else False
        }

