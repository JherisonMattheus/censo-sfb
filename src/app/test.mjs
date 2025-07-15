// delete-aluno.mjs
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args))

async function deletarAluno() {
  const id = 2 // ID do aluno a ser deletado

  const response = await fetch(`http://localhost:3000/api/alunos/${id}`, {
    method: 'DELETE'
  })

  const data = await response.json()
  console.log('Resposta:', data)
}

deletarAluno().catch(console.error)
