#!/bin/bash
set -e
psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" <<-EOSQL
    CREATE DATABASE shiftmaster_auth;
    CREATE DATABASE shiftmaster_employees;
    CREATE DATABASE shiftmaster_planning;
    CREATE DATABASE shiftmaster_absence;
    CREATE DATABASE shiftmaster_notifications;
EOSQL
