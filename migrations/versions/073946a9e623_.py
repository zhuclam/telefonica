"""empty message

Revision ID: 073946a9e623
Revises: b5bf48a221e5
Create Date: 2020-12-22 21:28:35.992535

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import mysql

# revision identifiers, used by Alembic.
revision = '073946a9e623'
down_revision = 'b5bf48a221e5'
branch_labels = None
depends_on = None


def upgrade():
    op.alter_column('telefonica', 'telefono', new_column_name='phone', existing_type=mysql.VARCHAR(length=50))
    op.alter_column('telefonica', 'comentarios', new_column_name='comments', existing_type=mysql.VARCHAR(length=100))
    op.alter_column('telefonica', 'direccion', new_column_name='info', existing_type=mysql.VARCHAR(length=50))

    op.alter_column('telefonica_test', 'telefono', new_column_name='phone', existing_type=mysql.VARCHAR(length=50))
    op.alter_column('telefonica_test', 'comentarios', new_column_name='comments', existing_type=mysql.VARCHAR(length=100))
    op.alter_column('telefonica_test', 'direccion', new_column_name='info', existing_type=mysql.VARCHAR(length=50))

    op.alter_column('telefonica_backup', 'telefono', new_column_name='phone', existing_type=mysql.VARCHAR(length=50))
    op.alter_column('telefonica_backup', 'comentarios', new_column_name='comments', existing_type=mysql.VARCHAR(length=100))
    op.alter_column('telefonica_backup', 'direccion', new_column_name='info', existing_type=mysql.VARCHAR(length=50))


def downgrade():
    op.alter_column('telefonica', 'phone', new_column_name='telefono', existing_type=mysql.VARCHAR(length=50))
    op.alter_column('telefonica', 'comments', new_column_name='comentarios', existing_type=mysql.VARCHAR(length=100))
    op.alter_column('telefonica', 'info', new_column_name='direccion', existing_type=mysql.VARCHAR(length=50))

    op.alter_column('telefonica_test', 'phone', new_column_name='telefono', existing_type=mysql.VARCHAR(length=50))
    op.alter_column('telefonica_test', 'comments', new_column_name='comentarios', existing_type=mysql.VARCHAR(length=100))
    op.alter_column('telefonica_test', 'info', new_column_name='direccion', existing_type=mysql.VARCHAR(length=50))

    op.alter_column('telefonica_backup', 'phone', new_column_name='telefono', existing_type=mysql.VARCHAR(length=50))
    op.alter_column('telefonica_backup', 'comments', new_column_name='comentarios', existing_type=mysql.VARCHAR(length=100))
    op.alter_column('telefonica_backup', 'info', new_column_name='direccion', existing_type=mysql.VARCHAR(length=50))
