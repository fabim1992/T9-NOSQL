# TESTE DE MONGODB - SISTEMAS NOSQL

**Curso:** Pós-Graduação/MBA em Big Data 
**Disciplina:** Sistemas de Bancos de Dados NoSQL 
**Professor:** Leivio Fontenele 
---

## IDENTIFICAÇÃO DO ALUNO

**Nome completo:** _______________________________________________ 
**Matrícula:** ____________________ 
**Email:** ________________________________________

---

## INSTRUÇÕES GERAIS

1. Este teste é **INDIVIDUAL** e deve ser realizado sem comunicação com outros alunos
2. Utilize o **MongoDB Compass** ou **Compass Shell** para resolver todas as questões
3. Você pode consultar a **documentação oficial do MongoDB** durante o teste
4. Para cada questão, forneça:
 - O comando/pipeline completo executado
 - Screenshot ou descrição do resultado obtido
 - Breve explicação da sua solução (quando solicitado)
5. Salve suas respostas no formato indicado no arquivo `template-resposta.md`
6. A clareza, organização e comentários no código serão considerados na avaliação
7. **Banco de dados utilizado:** `sample_mflix` (certifique-se de estar conectado)

---

## QUESTÕES

### QUESTÃO 1 (20 pontos) - Consulta Básica com Filtros

Encontre todos os filmes do gênero **"Drama"** lançados entre **2010 e 2015** que tenham uma classificação IMDB (`imdb.rating`) superior a **7.5**. 

**Requisitos:**
- Retorne apenas os campos: `title`, `year`, `imdb.rating` e `genres`
- Ordene os resultados por rating **decrescente**
- Limite os resultados aos 20 primeiros filmes

**Entregue:**
- [ ] Comando utilizado
- [ ] Quantidade de documentos encontrados
- [ ] Screenshot dos 5 primeiros resultados

---

### QUESTÃO 2 (20 pontos) - Agregação com Agrupamento

Calcule a quantidade total de filmes por país (campo `countries`). Mostre os **10 países** com maior produção cinematográfica.

**Requisitos:**
- Exiba o nome do país e a quantidade de filmes
- Considere que um filme pode ter múltiplos países
- Ordene pela quantidade de filmes de forma **decrescente**
- Ignore filmes sem informação de país

**Entregue:**
- [ ] Pipeline de agregação completa
- [ ] Lista dos 10 países com suas respectivas quantidades
- [ ] Screenshot do resultado

---

### QUESTÃO 3 (20 pontos) - Pipeline com $unwind e $group

Identifique os **5 atores** (campo `cast`) que mais aparecem em filmes da base. Para cada ator, mostre:
- Nome do ator
- Quantidade de filmes
- Média de rating (`imdb.rating`) dos filmes em que participou

**Requisitos:**
- Considere apenas filmes que tenham rating definido
- Arredonde a média de rating para 2 casas decimais
- Ordene pela quantidade de filmes de forma **decrescente**

**Entregue:**
- [ ] Pipeline completa com $unwind e $group
- [ ] Tabela com os 5 atores e suas estatísticas
- [ ] Screenshot do resultado

---

### QUESTÃO 4 (20 pontos) - Agregação com $lookup

Crie uma pipeline que combine dados das collections `movies` e `comments`. Para os **5 filmes com mais comentários**, mostre:
- Título do filme
- Ano de lançamento
- Quantidade de comentários
- Lista com nome e email dos **3 primeiros** usuários que comentaram

**Requisitos:**
- Use $lookup para relacionar as collections
- Ordene pelos filmes com mais comentários
- Limite o resultado aos 5 filmes

**Entregue:**
- [ ] Pipeline completa com $lookup
- [ ] Estrutura do documento resultante
- [ ] Screenshot mostrando pelo menos 2 filmes

---

### QUESTÃO 5 (20 pontos) - Agregação com Múltiplos Estágios

Crie uma pipeline que identifique os gêneros mais **"subestimados"** - aqueles que têm poucos filmes mas alta qualidade.

**Critérios:**
- Gêneros com **no mínimo 10 filmes** e **no máximo 50 filmes**
- Rating médio superior a **7.0**
- Mostre: gênero, quantidade de filmes e rating médio (2 casas decimais)
- Ordene pelo rating médio **decrescente**

**Requisitos:**
- Use $unwind para separar os gêneros
- Aplique filtros apropriados
- Use $match em múltiplos estágios se necessário

**Entregue:**
- [ ] Pipeline completa
- [ ] Lista de gêneros subestimados
- [ ] Explicação: por que esses gêneros são considerados subestimados?

---

## CRITÉRIOS DE AVALIAÇÃO

Para cada questão será avaliado:

| Critério | Pontos | Descrição |
|----------|--------|-----------|
| **Sintaxe e Execução** | 8 | Query/pipeline sintaticamente correta e executável |
| **Resultado Correto** | 8 | Resposta atende aos requisitos e está correta |
| **Organização** | 4 | Código legível, bem formatado e comentado |

**Pontuação Final:** Soma das 5 questões = **100 pontos**

---

## ENTREGA

1. Preencha o arquivo `template-resposta.md` com todas as suas respostas
2. Inclua screenshots solicitados em cada questão
3. Formato de entrega: arquivo `.md` ou `.pdf` com nome: `MONGODB_SeuNome_Matricula`
4. Prazo: conforme instruções do professor

---

**BOA PROVA!**

**Lembre-se:** MongoDB é sobre encontrar padrões nos dados. Analise, experimente e documente seu raciocínio!
