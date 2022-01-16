"""empty message

Revision ID: d7afba751491
Revises: 2a243e91f1ec
Create Date: 2022-01-16 00:14:00.646263

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'd7afba751491'
down_revision = '2a243e91f1ec'
branch_labels = None
depends_on = None


def upgrade():
    op.add_column('territories', sa.Column('public', sa.Boolean(), server_default='0', nullable=False))
    op.add_column('territories_test', sa.Column('public', sa.Boolean(), server_default='0', nullable=False))


def downgrade():
    op.drop_column('territories_test', 'public')
    op.drop_column('territories', 'public')
