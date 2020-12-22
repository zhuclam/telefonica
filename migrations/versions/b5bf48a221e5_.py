"""empty message

Revision ID: b5bf48a221e5
Revises: 81fc291e5908
Create Date: 2020-12-22 21:11:11.854949

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import mysql

# revision identifiers, used by Alembic.
revision = 'b5bf48a221e5'
down_revision = '81fc291e5908'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_index(op.f('ix_history_phone_id'), 'history', ['phone_id'], unique=True)
    op.drop_index('first_index', table_name='history')
    op.create_index(op.f('ix_history_backup_phone_id'), 'history_backup', ['phone_id'], unique=True)
    op.drop_index('first_index', table_name='history_backup')
    op.create_index(op.f('ix_history_test_phone_id'), 'history_test', ['phone_id'], unique=True)
    op.drop_index('first_index', table_name='history_test')
    op.alter_column('telefonica', 'direccion',
               existing_type=mysql.VARCHAR(length=50),
               nullable=True)
    op.alter_column('telefonica', 'no_call',
               existing_type=mysql.INTEGER(display_width=11),
               nullable=False,
               existing_server_default=sa.text("'0'"))
    op.alter_column('telefonica_backup', 'direccion',
               existing_type=mysql.VARCHAR(length=50),
               nullable=True)
    op.alter_column('telefonica_backup', 'no_call',
               existing_type=mysql.INTEGER(display_width=11),
               nullable=False,
               existing_server_default=sa.text("'0'"))
    op.alter_column('telefonica_test', 'direccion',
               existing_type=mysql.VARCHAR(length=50),
               nullable=True)
    op.alter_column('telefonica_test', 'no_call',
               existing_type=mysql.INTEGER(display_width=11),
               nullable=False,
               existing_server_default=sa.text("'0'"))
    op.alter_column('users', 'password_hash',
               existing_type=mysql.VARCHAR(length=128),
               nullable=False)
    op.alter_column('users', 'username',
               existing_type=mysql.VARCHAR(length=128),
               nullable=False)
    op.create_unique_constraint(None, 'users', ['username'])
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint(None, 'users', type_='unique')
    op.alter_column('users', 'username',
               existing_type=mysql.VARCHAR(length=128),
               nullable=True)
    op.alter_column('users', 'password_hash',
               existing_type=mysql.VARCHAR(length=128),
               nullable=True)
    op.alter_column('telefonica_test', 'no_call',
               existing_type=mysql.INTEGER(display_width=11),
               nullable=True,
               existing_server_default=sa.text("'0'"))
    op.alter_column('telefonica_test', 'direccion',
               existing_type=mysql.VARCHAR(length=50),
               nullable=False)
    op.alter_column('telefonica_backup', 'no_call',
               existing_type=mysql.INTEGER(display_width=11),
               nullable=True,
               existing_server_default=sa.text("'0'"))
    op.alter_column('telefonica_backup', 'direccion',
               existing_type=mysql.VARCHAR(length=50),
               nullable=False)
    op.alter_column('telefonica', 'no_call',
               existing_type=mysql.INTEGER(display_width=11),
               nullable=True,
               existing_server_default=sa.text("'0'"))
    op.alter_column('telefonica', 'direccion',
               existing_type=mysql.VARCHAR(length=50),
               nullable=False)
    op.create_index('first_index', 'history_test', ['phone_id'], unique=False)
    op.drop_index(op.f('ix_history_test_phone_id'), table_name='history_test')
    op.create_index('first_index', 'history_backup', ['phone_id'], unique=False)
    op.drop_index(op.f('ix_history_backup_phone_id'), table_name='history_backup')
    op.create_index('first_index', 'history', ['phone_id'], unique=False)
    op.drop_index(op.f('ix_history_phone_id'), table_name='history')
    # ### end Alembic commands ###