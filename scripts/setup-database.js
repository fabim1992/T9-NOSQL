// ============================================================================
// SCRIPT DE VERIFICAÇÃO E SETUP DO BANCO DE DADOS
// MongoDB NoSQL Exam - sample_mflix
// ============================================================================

print("\n============================================");
print("VERIFICAÇÃO DO AMBIENTE - MONGODB EXAM");
print("============================================\n");

// Conectar ao banco sample_mflix
use sample_mflix

print("1. Verificando conexão com o banco...");
try {
  db.runCommand({ ping: 1 });
  print("   [OK] Conexão estabelecida com sucesso\n");
} catch (e) {
  print("   [ERRO] Não foi possível conectar ao banco");
  print("   Detalhes:", e);
  quit();
}

print("2. Verificando collections disponíveis...");
let collections = db.getCollectionNames();
print("   Collections encontradas:", collections.length);
collections.forEach(coll => print("   -", coll));
print("");

// Verificar collections obrigatórias
let requiredCollections = ["movies", "comments", "users", "theaters", "sessions"];
let missingCollections = [];

requiredCollections.forEach(coll => {
  if (!collections.includes(coll)) {
    missingCollections.push(coll);
  }
});

if (missingCollections.length > 0) {
  print("   [ERRO] AVISO: Collections faltando:", missingCollections.join(", "));
  print("   Execute o comando para carregar sample databases no Atlas\n");
} else {
  print("   [OK] Todas as collections necessárias estão presentes\n");
}

print("3. Verificando quantidade de documentos...");

// Contar documentos em movies
let moviesCount = db.movies.countDocuments();
print("   - movies:", moviesCount, "documentos");
if (moviesCount < 1000) {
  print("     [AVISO] Esperado pelo menos 20,000 documentos");
}

// Contar documentos em comments
let commentsCount = db.comments.countDocuments();
print("   - comments:", commentsCount, "documentos");
if (commentsCount < 1000) {
  print("     [AVISO] Esperado pelo menos 50,000 documentos");
}

// Contar documentos em users
let usersCount = db.users.countDocuments();
print("   - users:", usersCount, "documentos");

print("");

print("4. Verificando estrutura dos documentos...");

// Verificar estrutura de movies
let sampleMovie = db.movies.findOne({}, {
  title: 1,
  year: 1,
  genres: 1,
  cast: 1,
  directors: 1,
  countries: 1,
  "imdb.rating": 1
});

if (sampleMovie) {
  print("   [OK] Estrutura de 'movies' validada");
  print("     Exemplo de filme:", sampleMovie.title);
  
  // Verificar campos importantes
  let hasRating = db.movies.countDocuments({ "imdb.rating": { $exists: true } });
  let hasGenres = db.movies.countDocuments({ genres: { $exists: true, $ne: [] } });
  let hasCast = db.movies.countDocuments({ cast: { $exists: true, $ne: [] } });
  
  print("     - Filmes com rating:", hasRating);
  print("     - Filmes com gêneros:", hasGenres);
  print("     - Filmes com elenco:", hasCast);
} else {
  print("   [ERRO] Collection 'movies' está vazia");
}

print("");

// Verificar estrutura de comments
let sampleComment = db.comments.findOne({}, {
  name: 1,
  email: 1,
  movie_id: 1,
  date: 1
});

if (sampleComment) {
  print("   [OK] Estrutura de 'comments' validada");
  print("     Exemplo de usuário:", sampleComment.name);
  print("     Email:", sampleComment.email);
} else {
  print("   [ERRO] Collection 'comments' está vazia");
}

print("");

print("5. Testando queries básicas...");

// Teste 1: Query simples
try {
  let testQuery1 = db.movies.find({ year: 2010 }).limit(1).toArray();
  print("   [OK] Query básica funcionando");
} catch (e) {
  print("   [ERRO] na query básica:", e.message);
}

// Teste 2: Aggregation simples
try {
  let testAgg = db.movies.aggregate([
    { $match: { year: 2010 } },
    { $count: "total" }
  ]).toArray();
  print("   [OK] Aggregation pipeline funcionando");
} catch (e) {
  print("   [ERRO] na aggregation:", e.message);
}

// Teste 3: $lookup
try {
  let testLookup = db.movies.aggregate([
    { $limit: 1 },
    {
      $lookup: {
        from: "comments",
        localField: "_id",
        foreignField: "movie_id",
        as: "comentarios"
      }
    }
  ]).toArray();
  print("   [OK] Operador $lookup funcionando");
} catch (e) {
  print("   [ERRO] no $lookup:", e.message);
}

print("");

print("6. Verificando índices...");
let indexes = db.movies.getIndexes();
print("   Índices em 'movies':", indexes.length);
indexes.forEach(idx => {
  print("   -", JSON.stringify(idx.key));
});

print("");

print("============================================");
print("RESUMO DA VERIFICAÇÃO");
print("============================================");

let status = "OK";
let warnings = [];

if (moviesCount < 20000) {
  warnings.push("Poucos documentos em 'movies'");
  status = "ATENÇÃO";
}

if (commentsCount < 50000) {
  warnings.push("Poucos documentos em 'comments'");
  status = "ATENÇÃO";
}

if (missingCollections.length > 0) {
  warnings.push("Collections faltando: " + missingCollections.join(", "));
  status = "ERRO";
}

if (status === "OK") {
  print("\n   [OK] AMBIENTE PRONTO PARA O TESTE");
  print("   Todas as verificações passaram com sucesso.\n");
} else if (status === "ATENÇÃO") {
  print("\n   [AVISO] AMBIENTE COM AVISOS");
  print("   O teste pode ser aplicado, mas há algumas observações:");
  warnings.forEach(w => print("   -", w));
  print("");
} else {
  print("\n   [ERRO] AMBIENTE NÃO ESTÁ PRONTO");
  print("   Corrija os seguintes problemas:");
  warnings.forEach(w => print("   -", w));
  print("");
}

print("============================================");
print("PRÓXIMOS PASSOS");
print("============================================");
print("1. Se o ambiente está OK, distribua o teste aos alunos");
print("2. Compartilhe a string de conexão (sem credenciais sensíveis)");
print("3. Oriente sobre o uso do MongoDB Compass");
print("4. Boa sorte com o teste!\n");

print("Script finalizado em:", new Date());
print("============================================\n");
