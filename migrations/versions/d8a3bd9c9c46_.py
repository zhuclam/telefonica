"""empty message

Revision ID: d8a3bd9c9c46
Revises: dbcf1cbc87be
Create Date: 2021-04-10 20:02:45.139445

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import mysql

# revision identifiers, used by Alembic.
revision = 'd8a3bd9c9c46'
down_revision = 'dbcf1cbc87be'
branch_labels = None
depends_on = None


def upgrade():
    op.alter_column('configurations', 'answering_machine_max_attemps',
               existing_type=mysql.INTEGER(display_width=11),
               nullable=True,
               existing_server_default=sa.text("'2'"))
    op.alter_column('configurations', 'answering_machine_postponed_days',
               existing_type=mysql.INTEGER(display_width=11),
               nullable=True,
               existing_server_default=sa.text("'10'"))
    op.alter_column('configurations', 'hidden_buttons',
               existing_type=mysql.VARCHAR(length=40),
               nullable=True,
               existing_server_default=sa.text("''"))
    op.alter_column('configurations', 'non_existent_postponed_days',
               existing_type=mysql.INTEGER(display_width=11),
               nullable=True,
               existing_server_default=sa.text("'180'"))
    op.alter_column('configurations', 'postponed_button_days',
               existing_type=mysql.INTEGER(display_width=11),
               nullable=True,
               existing_server_default=sa.text("'3'"))
    op.alter_column('configurations', 'unanswered_max_attemps',
               existing_type=mysql.INTEGER(display_width=11),
               nullable=True,
               existing_server_default=sa.text("'3'"))
    op.alter_column('configurations_test', 'answering_machine_max_attemps',
               existing_type=mysql.INTEGER(display_width=11),
               nullable=True,
               existing_server_default=sa.text("'2'"))
    op.alter_column('configurations_test', 'answering_machine_postponed_days',
               existing_type=mysql.INTEGER(display_width=11),
               nullable=True,
               existing_server_default=sa.text("'10'"))
    op.alter_column('configurations_test', 'hidden_buttons',
               existing_type=mysql.VARCHAR(length=40),
               nullable=True,
               existing_server_default=sa.text("''"))
    op.alter_column('configurations_test', 'non_existent_postponed_days',
               existing_type=mysql.INTEGER(display_width=11),
               nullable=True,
               existing_server_default=sa.text("'180'"))
    op.alter_column('configurations_test', 'postponed_button_days',
               existing_type=mysql.INTEGER(display_width=11),
               nullable=True,
               existing_server_default=sa.text("'3'"))
    op.alter_column('configurations_test', 'unanswered_max_attemps',
               existing_type=mysql.INTEGER(display_width=11),
               nullable=True,
               existing_server_default=sa.text("'3'"))


def downgrade():
    op.alter_column('configurations_test', 'unanswered_max_attemps',
               existing_type=mysql.INTEGER(display_width=11),
               nullable=False,
               existing_server_default=sa.text("'3'"))
    op.alter_column('configurations_test', 'postponed_button_days',
               existing_type=mysql.INTEGER(display_width=11),
               nullable=False,
               existing_server_default=sa.text("'3'"))
    op.alter_column('configurations_test', 'non_existent_postponed_days',
               existing_type=mysql.INTEGER(display_width=11),
               nullable=False,
               existing_server_default=sa.text("'180'"))
    op.alter_column('configurations_test', 'hidden_buttons',
               existing_type=mysql.VARCHAR(length=40),
               nullable=False,
               existing_server_default=sa.text("''"))
    op.alter_column('configurations_test', 'answering_machine_postponed_days',
               existing_type=mysql.INTEGER(display_width=11),
               nullable=False,
               existing_server_default=sa.text("'10'"))
    op.alter_column('configurations_test', 'answering_machine_max_attemps',
               existing_type=mysql.INTEGER(display_width=11),
               nullable=False,
               existing_server_default=sa.text("'2'"))
    op.alter_column('configurations', 'unanswered_max_attemps',
               existing_type=mysql.INTEGER(display_width=11),
               nullable=False,
               existing_server_default=sa.text("'3'"))
    op.alter_column('configurations', 'postponed_button_days',
               existing_type=mysql.INTEGER(display_width=11),
               nullable=False,
               existing_server_default=sa.text("'3'"))
    op.alter_column('configurations', 'non_existent_postponed_days',
               existing_type=mysql.INTEGER(display_width=11),
               nullable=False,
               existing_server_default=sa.text("'180'"))
    op.alter_column('configurations', 'hidden_buttons',
               existing_type=mysql.VARCHAR(length=40),
               nullable=False,
               existing_server_default=sa.text("''"))
    op.alter_column('configurations', 'answering_machine_postponed_days',
               existing_type=mysql.INTEGER(display_width=11),
               nullable=False,
               existing_server_default=sa.text("'10'"))
    op.alter_column('configurations', 'answering_machine_max_attemps',
               existing_type=mysql.INTEGER(display_width=11),
               nullable=False,
               existing_server_default=sa.text("'2'"))
