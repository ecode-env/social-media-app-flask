from datetime import datetime, timezone
from ..extensions import db


class Follow(db.Model):
    __tablename__ = "follow"

    id = db.Column(db.Integer, primary_key=True)

    # The user who is following someone
    follower_id = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=False)

    # The user being followed
    following_id = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=False)

    # When the follow was made
    created_at = db.Column(db.DateTime, default=datetime.now(timezone.utc))

    def __repr__(self):
        return f"<Follow {self.follower_id} → {self.following_id}>"
