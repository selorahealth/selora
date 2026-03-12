const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'supabase', 'migrations', '001_initial_schema.sql');
let sql = fs.readFileSync(filePath, 'utf8');

// 1. Make indexes idempotent
sql = sql.replace(/create index /ig, 'create index if not exists ');

// 2. Make policies idempotent
sql = sql.replace(/create policy "([^"]+)" on public\.([a-zA-Z_]+)/ig, 'drop policy if exists "$1" on public.$2;\ncreate policy "$1" on public.$2');

// 3. Make triggers idempotent
// Ex: create trigger on_auth_user_created \n  after insert on auth.users
sql = sql.replace(/create trigger ([a-zA-Z_]+)\n\s+([^\n]+) on ([a-zA-Z_.]+)/ig, 'drop trigger if exists $1 on $3;\ncreate trigger $1\n  $2 on $3');

fs.writeFileSync(filePath, sql);
console.log('Successfully made SQL schema idempotent!');
