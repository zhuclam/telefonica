"""empty message

Revision ID: 22641ee466c4
Revises: d231efd2533a
Create Date: 2021-04-10 01:03:06.458862

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '22641ee466c4'
down_revision = 'd231efd2533a'
branch_labels = None
depends_on = None


def upgrade():
    op.create_table('territories',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=40), nullable=False),
    sa.Column('active', sa.Boolean(), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('name')
    )
    op.create_table('territories_test',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=40), nullable=False),
    sa.Column('active', sa.Boolean(), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('name')
    )

    op.execute("insert into territories values (null, 'base', 1);")
    op.execute("insert into territories_test values (null, 'base', 1);")

    op.add_column('telefonica', sa.Column('territory_id', sa.Integer(), nullable=False, server_default="1"))
    op.create_foreign_key('telefonica_territories_foreign', 'telefonica', 'territories', ['territory_id'], ['id'])
    op.add_column('telefonica_backup', sa.Column('territory_id', sa.Integer(), nullable=False, server_default="1"))
    op.create_foreign_key('telefonica_backup_territories_foreign', 'telefonica_backup', 'territories', ['territory_id'], ['id'])
    op.add_column('telefonica_test', sa.Column('territory_id', sa.Integer(), nullable=False, server_default="1"))
    op.create_foreign_key('telefonica_test_territories_foreign', 'telefonica_test', 'territories_test', ['territory_id'], ['id'])


def downgrade():
    op.drop_constraint('telefonica_test_territories_foreign', 'telefonica_test', type_='foreignkey')
    op.drop_column('telefonica_test', 'territory_id')
    op.drop_constraint('telefonica_backup_territories_foreign', 'telefonica_backup', type_='foreignkey')
    op.drop_column('telefonica_backup', 'territory_id')
    op.drop_constraint('telefonica_territories_foreign', 'telefonica', type_='foreignkey')
    op.drop_column('telefonica', 'territory_id')
    op.drop_table('territories_test')
    op.drop_table('territories')
