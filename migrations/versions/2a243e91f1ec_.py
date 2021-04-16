"""empty message

Revision ID: 2a243e91f1ec
Revises: 03308acd5a5d
Create Date: 2021-04-15 20:17:48.316799

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '2a243e91f1ec'
down_revision = '03308acd5a5d'
branch_labels = None
depends_on = None


def upgrade():
    op.add_column('telefonica', sa.Column('campaign_status', sa.Boolean(), server_default='0', nullable=False))
    op.add_column('telefonica_backup', sa.Column('campaign_status', sa.Boolean(), server_default='0', nullable=False))
    op.add_column('telefonica_test', sa.Column('campaign_status', sa.Boolean(), server_default='0', nullable=False))


def downgrade():
    op.drop_column('telefonica_test', 'campaign_status')
    op.drop_column('telefonica_backup', 'campaign_status')
    op.drop_column('telefonica', 'campaign_status')
