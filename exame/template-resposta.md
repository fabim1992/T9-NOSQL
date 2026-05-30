# RESPOSTAS - TESTE DE MONGODB

## IDENTIFICAÇÃO

**Nome completo:** Fabio Carneiro Albuquerque Junior 
**Matrícula:** 2651190
**Email:** fabiojunior_1992@hotmail.com
**Data:** 30/05/2026

---

## QUESTÃO 1 - Consulta Básica com Filtros

### Comando Utilizado
```javascript
// Cole aqui seu comando find()
db.movies.aggregate([
  {
    $match: {
      genres: "Drama",
      "imdb.rating": { $gt: 7.5 },
      year: { $gte: 2010, $lte: 2015 }
    }
  },
    {
    $sort:{"imdb.rating":-1}
  },
  {
    $limit:20
  },
  {
    $project:{
    _id: 0,
      title:1,
      year:1,
      "imdb.rating":1,
      genres:1,
    }
  }
])

```

### Resultado Obtido
- **Quantidade de documentos encontrados:** ______
- **5 primeiros filmes (título e rating):**
 1. Most likely to succeed / 8.9
 2. Drishyam / 8.9
 3. Killswitch / 8.8
 4. Kaakkaa Muttai / 8.8
 5. The Great Alone / 8.7

### Screenshot
_[Anexar screenshot ou indicar arquivo: questao01.png]_

### Observações (opcional)


---

## QUESTÃO 2 - Agregação com Agrupamento

### Pipeline Utilizada
```javascript
// Cole aqui sua pipeline de agregação
db.movies.aggregate([
  { $unwind: "$countries" },
  {
    $group: {
      _id: "$countries",
      total: { $sum: 1 }
    }
  },
  { $sort: { total: -1 } },
  { $limit: 10 }
])
```

### Resultado Obtido

| Posição | País | Quantidade de Filmes |
|---------|------|----------------------|
| 1º | | |  USA.      10921
| 2º | | |  UK.       2652 
| 3º | | | FRANCE.    2647 
| 4º | | | GERMANY.   1494
| 5º | | | CANADA.    1260
| 6º | | | ITALY.     1217
| 7º | | | JAPAN.     786
| 8º | | | SPAIN.     675
| 9º | | | INDIA.     564
| 10º | | |AUSTRALIA. 470

### Screenshot
_[Anexar screenshot ou indicar arquivo: questao02.png]_

### Observações (opcional)


---

## QUESTÃO 3 - Pipeline com $unwind e $group

### Pipeline Utilizada
```javascript
// Cole aqui sua pipeline de agregação
db.movies.aggregate([
  {
    $match: {
      "imdb.rating": { $exists: true }
    },
  },
  { $unwind: "$cast" },
  {
    $group: {
      _id: "$cast",
      total_filmes: { $sum: 1 },
      media_rating: { $avg: "$imdb.rating" }
    }
  },
  { $sort: { total_filmes: -1 } },
  { $limit: 5 },
  {
    $project: {
      _id: 0,
      ator: "$_id",
      total_filmes: 1,
      media_rating: { $round: ["$media_rating", 2] }
    }
  }
])
```

### Resultado Obtido

| Posição |      Ator          Qtd Filmes | Rating Médio |
|---------|-------------------|------------|--------------|
| 1º | | | | Gèrard Depardieu      67.           6.69
| 2º | | | | Robert De Niro        58.           6.96
| 3º | | | | Michael Caine.        51.           6.71
| 4º | | | | Bruce Willis.         49.           6.41
| 5º | | | | Samuel L. Jackson     48.           6.4

### Screenshot
_[Anexar screenshot ou indicar arquivo: questao03.png]_

### Observações (opcional)


---

## QUESTÃO 4 - Agregação com $lookup

### Pipeline Utilizada
```javascript
// Cole aqui sua pipeline com $lookup
db.comments.aggregate([
  {
    $group: {
      _id: "$movie_id",
      total_comentarios: { $sum: 1 },
      comentarios: {
        $push: {
          name: "$name",
          email: "$email"
        }
      }
    }
  },
  { $sort: { total_comentarios: -1 } },
  { $limit: 5 },
  {
    $lookup: {
      from: "movies",
      let: { movie_id: "$_id" },
      pipeline: [
        { $match: { $expr: { $eq: ["$_id", "$$movie_id"] } } },
        { $project: { _id: 0, title: 1, year: 1 } }
      ],
      as: "filme"
    }
  },
  { $unwind: "$filme" },
  {
    $project: {
      _id: 0,
      titulo: "$filme.title",
      ano: "$filme.year",
      total_comentarios: 1,
      primeiros_usuarios: { $slice: ["$comentarios", 3] }
    }
  }
])
```

### Resultado Obtido

**Filme 1:**
- Título: The Taking of Pelham 1 2 3
- Ano: 2009
- Quantidade de comentários: 161
- Primeiros 3 usuários:
 1. Nome: Alliser Thorne | Email: owen_teale@gameofthron.es
 2. Nome: Anthony Cline  | Email: anthony_cline@fakegmail.com
 3. Nome: Andrea Le      | Email: andrea_le@fakegmail.com

**Filme 2:**
- Título: Ocean's Eleven
- Ano: 2001
- Quantidade de comentários: 158
- Primeiros 3 usuários:
 1. Nome: Amy Phillips   | Email: amy_phillips@fakegmail.com
 2. Nome: Anthony Smith  | Email: anthony_smith@fakegmail.com
 3. Nome: Anthony Hurst  | Email: anthony_hurst@fakegmail.com

### Screenshot
_[Anexar screenshot ou indicar arquivo: questao04.png]_

### Observações (opcional)

---

## QUESTÃO 5 - Agregação com Múltiplos Estágios

### Pipeline Utilizada
```javascript
// Cole aqui sua pipeline completa
db.movies.aggregate([
  {
    $match: {
      genres: { $exists: true},
      "imdb.rating": { $type: "number", $gt: 0 }
    }
  },
  { $unwind: "$genres" },
  {
    $group: {
      _id: "$genres",
      quantidade: { $sum: 1 },
      ratingMedio: { $avg: "$imdb.rating" }
    }
  },
  {
    $match: {
      quantidade: { $gte: 10, $lte: 50 },
      ratingMedio: { $gt: 7.0 }
    }
  },
  {
    $project: {
      _id: 0,
      genero: "$_id",
      quantidade: 1,
      ratingMedio: { $round: ["$ratingMedio", 2] }
    }
  },
  { $sort: { ratingMedio: -1 } }
])
```

### Resultado Obtido

| Gênero | Qtd Filmes | Rating Médio |
|--------|------------|--------------|
| News         44           7.25
| | | |
| | | |
| | | |

### Explicação
**Por que esses gêneros são considerados subestimados?**
News eh considerado um genero forte porque poucas pessoas tem motivo para fazer um filme desse estilo, ja que nao eh popular, oque faz com que a qualidade seja elevada

### Screenshot
_[Anexar screenshot ou indicar arquivo: questao05.png]_

---