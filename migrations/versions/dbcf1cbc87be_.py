"""empty message

Revision ID: dbcf1cbc87be
Revises: 22641ee466c4
Create Date: 2021-04-10 19:54:13.837815

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'dbcf1cbc87be'
down_revision = '22641ee466c4'
branch_labels = None
depends_on = None


def upgrade():
    op.add_column('configurations', sa.Column('territory_id', sa.Integer(), server_default='1', nullable=False))
    op.create_unique_constraint("configurations.territory_id.unique", 'configurations', ['territory_id'])
    op.create_foreign_key("configurations.territory_id.foreign", 'configurations', 'territories', ['territory_id'], ['id'])
    op.add_column('configurations_test', sa.Column('territory_id', sa.Integer(), server_default='1', nullable=False))
    op.create_unique_constraint("configurations_test.territory_id.unique", 'configurations_test', ['territory_id'])
    op.create_foreign_key("configurations_test.territory_id.foreign", 'configurations_test', 'territories_test', ['territory_id'], ['id'])


def downgrade():
    op.drop_constraint("configurations_test.territory_id.foreign", 'configurations_test', type_='foreignkey')
    op.drop_constraint("configurations_test.territory_id.unique", 'configurations_test', type_='unique')
    op.drop_column('configurations_test', 'territory_id')
    op.drop_constraint("configurations.territory_id.foreign", 'configurations', type_='foreignkey')
    op.drop_constraint("configurations.territory_id.unique", 'configurations', type_='unique')
    op.drop_column('configurations', 'territory_id')
