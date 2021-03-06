"""empty message

Revision ID: 098851515a09
Revises: 28cb0be1f0d5
Create Date: 2020-12-29 21:38:28.773774

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '098851515a09'
down_revision = '28cb0be1f0d5'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_index('ix_history_phone_id', table_name='history')
    op.create_index(op.f('ix_history_phone_id'), 'history', ['phone_id'], unique=False)
    op.drop_index('ix_history_backup_phone_id', table_name='history_backup')
    op.create_index(op.f('ix_history_backup_phone_id'), 'history_backup', ['phone_id'], unique=False)
    op.drop_index('ix_history_test_phone_id', table_name='history_test')
    op.create_index(op.f('ix_history_test_phone_id'), 'history_test', ['phone_id'], unique=False)
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_index(op.f('ix_history_test_phone_id'), table_name='history_test')
    op.create_index('ix_history_test_phone_id', 'history_test', ['phone_id'], unique=True)
    op.drop_index(op.f('ix_history_backup_phone_id'), table_name='history_backup')
    op.create_index('ix_history_backup_phone_id', 'history_backup', ['phone_id'], unique=True)
    op.drop_index(op.f('ix_history_phone_id'), table_name='history')
    op.create_index('ix_history_phone_id', 'history', ['phone_id'], unique=True)
    # ### end Alembic commands ###
