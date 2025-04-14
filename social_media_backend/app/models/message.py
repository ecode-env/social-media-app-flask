from ..extensions import db
from datetime import datetime, timezone


class Message(db.Model):
    __tablename__ = 'message'

    # Foreign keys
    sender_id: db.Mapped[int] = db.mapped_column(db.ForeignKey('user.id'), primary_key=True)
    receiver_id: db.Mapped[int] = db.mapped_column(db.ForeignKey('user.id'), primary_key=True)

    # Message content and timestamp
    content: db.Mapped[str] = db.mapped_column(db.Text)
    created_at: db.Mapped[datetime] = db.mapped_column(
        db.DateTime(timezone=True), default=datetime.utcnow
    )

    # Relationships
    sender = db.relationship('User', foreign_keys=[sender_id], backref='sent_messages')
    receiver = db.relationship('User', foreign_keys=[receiver_id], backref='received_messages')

    @staticmethod
    def get_conversation(user1_id: int, user2_id: int):
        messages = Message.query.filter(
            ((Message.sender_id == user1_id) & (Message.receiver_id == user2_id)) |
            ((Message.sender_id == user2_id) & (Message.receiver_id == user1_id))
        ).order_by(Message.created_at.asc()).all()

        return messages
