"""empty message

Revision ID: 03308acd5a5d
Revises: d8a3bd9c9c46
Create Date: 2021-04-14 23:50:21.288318

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import mysql

# revision identifiers, used by Alembic.
revision = '03308acd5a5d'
down_revision = 'd8a3bd9c9c46'
branch_labels = None
depends_on = None


def upgrade():
    op.drop_constraint('configurations.territory_id.foreign', 'configurations', type_='foreignkey')
    op.drop_index('configurations.territory_id.unique', table_name='configurations')
    op.drop_column('configurations', 'campaign_mode')
    op.drop_column('configurations', 'territory_id')
    op.drop_constraint('configurations_test.territory_id.foreign', 'configurations_test', type_='foreignkey')  
    op.drop_index('configurations_test.territory_id.unique', table_name='configurations_test')
    op.drop_column('configurations_test', 'campaign_mode')
    op.drop_column('configurations_test', 'territory_id')
    op.add_column('territories', sa.Column('campaign_mode', sa.Boolean(), nullable=False, default=False))
    op.add_column('territories_test', sa.Column('campaign_mode', sa.Boolean(), nullable=False, default=False))


def downgrade():
    op.drop_column('territories_test', 'campaign_mode')
    op.drop_column('territories', 'campaign_mode')
    op.add_column('configurations_test', sa.Column('territory_id', mysql.INTEGER(display_width=11), server_default=sa.text("'1'"), autoincrement=False, nullable=False))
    op.add_column('configurations_test', sa.Column('campaign_mode', mysql.TINYINT(display_width=1), server_default=sa.text("'0'"), autoincrement=False, nullable=False))
    op.create_index('configurations.territory_id.unique', 'configurations_test', ['territory_id'], unique=True)
    op.add_column('configurations', sa.Column('territory_id', mysql.INTEGER(display_width=11), server_default=sa.text("'1'"), autoincrement=False, nullable=False))
    op.add_column('configurations', sa.Column('campaign_mode', mysql.TINYINT(display_width=1), server_default=sa.text("'0'"), autoincrement=False, nullable=False))
    op.create_index('configurations.territory_id.unique', 'configurations', ['territory_id'], unique=True)
    op.create_foreign_key('configurations.territory_id.foreign', 'configurations', 'territories', ['territory_id'], ['id'])
