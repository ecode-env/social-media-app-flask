# from datetime import datetime, timezone
# from ..extensions import db
#
# class Post(db.Model):
#     __tablename__ = 'post'
#
#     id: db.Mapped[int] = db.mapped_column(primary_key=True)
#
#     # User who created the post
#     user_id: db.Mapped[int] = db.mapped_column(db.ForeignKey('user.id'), nullable=False)
#
#     # Optional article title
#     title: db.Mapped[str] = db.mapped_column(db.String(255), nullable=True)
#
#     # Optional article content
#     content: db.Mapped[str] = db.mapped_column(db.Text, nullable=True)
#
#     # Optional media (image/video)
#     media_type: db.Mapped[str] = db.mapped_column(db.String(200), nullable=True)
#     media_url: db.Mapped[str] = db.mapped_column(db.String(200), nullable=True)
#
#     # Optional post type: "text", "image", "mixed"
#     post_type: db.Mapped[str] = db.mapped_column(db.String(20), nullable=True)
#
#     # Moderation or audit flags
#     is_flagged: db.Mapped[bool] = db.mapped_column(default=False)
#
#     # Timestamps
#     created_at: db.Mapped[datetime] = db.mapped_column(
#         db.DateTime(timezone=True),
#         default=lambda: datetime.now(timezone.utc)
#     )
#     updated_at: db.Mapped[datetime] = db.mapped_column(
#         db.DateTime(timezone=True),
#         default=lambda: datetime.now(timezone.utc),
#         onupdate=lambda: datetime.now(timezone.utc)
#     )
#
#     # Relationships
#     author = db.relationship('User', back_populates='posts')
#     comments = db.relationship('Comment', back_populates='post', cascade='all, delete-orphan')
#     likes = db.relationship('Like', back_populates='post', cascade='all, delete-orphan')
#
#     def to_json(self):
#         return {
#             "id":             self.id,
#             "user_id":        self.user_id,
#             "profile_picture": self.author.profile_picture_url,
#             "title":          self.title,
#             "content":        self.content,
#             "media_type":     self.media_type,
#             "media_url":      self.media_url,
#             "post_type":      self.post_type,
#             "fullName":       f"{self.author.f_name.title()} {self.author.l_name.title()}",
#             "is_flagged":     self.is_flagged,
#             "created_at":     self.created_at.isoformat() if self.created_at else None,
#             "updated_at":     self.updated_at.isoformat() if self.updated_at else None,
#             "author":         self.author.username if self.author else None,
#             "comment_count":  len(self.comments) or 0,
#             "like_count":     len(self.likes) or 0
#
#         }

import os
import subprocess
from datetime import datetime

# Set your name and email if needed
# subprocess.run(['git', 'config', 'user.name', 'your_username'])
# subprocess.run(['git', 'config', 'user.email', 'your_email@example.com'])

# Create a file to track the commits
file_name = "commit_spam.txt"

# Get today's date in the right format
today = datetime.now().strftime("%Y-%m-%d")

for i in range(1, 71):  # 1 to 70
    with open(file_name, "a") as file:
        file.write(f"Commit number {i} on {today}\n")

    subprocess.run(["git", "add", file_name])
    subprocess.run(["git", "commit", "--date", f"{today}T12:00:00", "-m", f"Commit {i} - feeling under the weather 🌧️"])

print("✅ Done making 70 commits!")

# After script finishes, don't forget to push
print("\nNow run: git push origin main (or master)")
