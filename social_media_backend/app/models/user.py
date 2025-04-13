from enum import Enum
from datetime import datetime, timezone
from ..extensions import db

class UserRoleEnum(Enum):
    admin = "admin"
    moderator = "moderator"
    user = "user"



