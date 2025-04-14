"""Make bio nullable

Revision ID: c4629ea73b23
Revises: 935057bb17d3
Create Date: 2025-04-14 16:26:16.557734

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'c4629ea73b23'
down_revision = '935057bb17d3'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.alter_column('bio',
               existing_type=sa.VARCHAR(length=160),
               nullable=True)

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.alter_column('bio',
               existing_type=sa.VARCHAR(length=160),
               nullable=False)

    # ### end Alembic commands ###
