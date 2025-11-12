#!/bin/bash
# Jalankan SQL Server di background
/opt/mssql/bin/sqlservr &

echo "⏳ Waiting for SQL Server to start..."
sleep 15

echo "🚀 Running init.sql..."
/opt/mssql-tools/bin/sqlcmd -S localhost -U sa -P P@ssw0rd -i /docker-entrypoint-initdb.d/init.sql

echo "✅ Database initialized!"

# Biarkan SQL Server tetap jalan di foreground
wait
