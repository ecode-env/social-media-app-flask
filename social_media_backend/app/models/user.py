from enum import Enum
from datetime import datetime, timezone
from ..extensions import db

# User roles - just for permissions
class UserRoleEnum(str, Enum):  # Inheriting str for easier JSON serialization
    admin = "admin"
    moderator = "moderator"
    user = "user"

class User(db.Model):
    __tablename__ = "user"

    id: db.Mapped[int] = db.mapped_column(primary_key=True)
    username: db.Mapped[str] = db.mapped_column(db.String(80), unique=True, nullable=False)
    email: db.Mapped[str] = db.mapped_column(db.String(120), unique=True, nullable=False)
    password: db.Mapped[str] = db.mapped_column(db.String(255), nullable=False)

    f_name: db.Mapped[str] = db.mapped_column(db.String(100), nullable=False)
    l_name: db.Mapped[str] = db.mapped_column(db.String(100), nullable=False)

    bio: db.Mapped[str] = db.mapped_column(db.String(500), nullable=True)
    profile_picture_url: db.Mapped[str] = db.mapped_column(db.Text, nullable=True)

    created_at: db.Mapped[datetime] = db.mapped_column(
        db.DateTime, default=datetime.now(timezone.utc)
    )
    updated_at: db.Mapped[datetime] = db.mapped_column(
        db.DateTime,
        default=datetime.now(timezone.utc),
        onupdate=datetime.now(timezone.utc)
    )
    last_seen: db.Mapped[datetime] = db.mapped_column(
        db.DateTime, default=datetime.now(timezone.utc)
    )

    role: db.Mapped[UserRoleEnum] = db.mapped_column(
        db.Enum(UserRoleEnum),
        default=UserRoleEnum.user,
        nullable=False
    )

    # USERS THIS USER IS FOLLOWING (I follow them)
    following = db.relationship(
        "Follow",
        foreign_keys="Follow.follower_id",
        backref="follower",
        lazy=True
    )

    # USERS WHO FOLLOW THIS USER (they follow me)
    followers = db.relationship(
        "Follow",
        foreign_keys="Follow.following_id",
        backref="following",
        lazy=True
    )

    posts = db.relationship('Post', back_populates='author', cascade='all, delete')

    # Likes on posts made by this user
    likes = db.relationship('Like', back_populates='user', lazy=True)

    # Likes on comments made by this user
    comment_likes = db.relationship('CommentLike', back_populates='user', lazy=True)

    def get_following_users(self):
        # Returns list of User objects this user follows
        return [f.following for f in self.following]

    def get_follower_users(self):
        # Returns list of User objects who follow this user
        return [f.follower for f in self.followers]

    def to_json(self):
        return {
            "id": self.id,
            "username": self.username,
            "email": self.email,
            "f_name": self.f_name,
            "l_name": self.l_name,
            "bio": self.bio or '',
            "profile_picture_url": self.profile_picture_url or '',
            "created_at": self.created_at.isoformat() if self.created_at else None,
            "updated_at": self.updated_at.isoformat() if self.updated_at else None,
            "last_seen": self.last_seen.isoformat() if self.last_seen else None,
            "role": self.role,
            "post_count": len(self.posts) if self.posts else 0,
            "following_count": len(self.following) if self.following else 0,
            "followers_count": len(self.followers) if self.followers else 0
        }

    def __repr__(self):
        return f"<User {self.username}>"