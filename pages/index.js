import { AlurakutMenu, AlurakutProfileSidebarMenuDefault, OrkutNostalgicIconSet } from '../src/lib/aluraCommons';
import Box from '../src/components/Box'
import MainGrid from '../src/components/MainGrid'
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations';
import React from 'react'

function ProfileSidebar(props) {
  return (
    <Box as="aside">
      <img src={`https://github.com/${props.gitHubUsername}.png`} style={{ borderRadius: '8px' }} />
      <hr />
      <p>
        <a 
          className="boxLink" 
          href={`https://github.com/${props.gitHubUsername}`}
          target="_blank"  
        >@{props.gitHubUsername}</a>
      </p>
      <hr />
      <AlurakutProfileSidebarMenuDefault />
    </Box>
  )
}

function ProfileRelationsBox(props) {
  return (
    <ProfileRelationsBoxWrapper >
      <p className="smallTitle">{props.titulo} ({props.itens.length})</p>

      <ul>
        {props.itens.map((itemAtual) => {
          return (
            <li key={itemAtual.id}>
              <a href={`https://github.com/${itemAtual.login}`} target="_blank">
                <img src={`https://github.com/${itemAtual.login}.png`} />
                <span>{itemAtual.login}</span>
              </a>
            </li>
          )
        })}
      </ul>
    </ProfileRelationsBoxWrapper>
  )
}

export default function Home() {

  const gitHubUsername = 'cecez';
  const pessoasFavoritas = ['cecez', 'peas', 'omariosouto'];

  const [comunidades, setComunidades] = React.useState([])
  const [seguidores, setSeguidores] = React.useState([])

  React.useEffect(() => {

  //   // // obtaining my github followers
    fetch('https://api.github.com/users/cecez/followers')
      .then((r) => r.json())
      .then((r) => setSeguidores(r))

  //   // obtaining my communities from dato cms
    fetch('https://graphql.datocms.com/', {
      method: 'POST',
      headers: {
        'Authorization': 'eb5a1482301915e399d410e68cfb9a',
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({ "query" : "query { allCommunities { id, title, creatorSlug, createdAt, imageUrl } }"})
    })
    .then((r) => r.json())
    .then((r) => setComunidades(r.data.allCommunities))

  }, [])


  return (
    <>
      <AlurakutMenu githubUser={gitHubUsername}/>
      <MainGrid>

        <div className="profileArea" style={{ gridArea: 'profileArea' }}>
          <ProfileSidebar gitHubUsername={gitHubUsername} />
        </div>

        <div className="welcomeArea" style={{ gridArea: 'welcomeArea' }}>
          <Box >
            <p className="title">Willkommen</p>

            <OrkutNostalgicIconSet />
          </Box>

          <Box>
            <p className="subTitle">O que você deseja fazer?</p>
            <form onSubmit={(e) => { 
                e.preventDefault();

                if (comunidades.length > 5) {
                  alert('Lamento, limite máximo de comunidades atingido.');
                  return;
                }

                const dadosDoFormulario = new FormData(e.target);
                const novaComunidade = {
                  title: dadosDoFormulario.get('titulo'), 
                  imageUrl: dadosDoFormulario.get('imagem'),
                  creatorSlug: gitHubUsername
                };

                console.log('Loading...')

                fetch('/api/comunidades', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify(novaComunidade)
                })
                .then(async (r) => {
                  const dados = await r.json()
                  console.log('...finished.')
                  setComunidades([...comunidades, dados.registroCriado])

                })

                // setComunidades([...comunidades, novaComunidade]);
              }}>
              <div>
                <input
                  aria-label="Qual o nome da comunidade?"
                  name="titulo"
                  placeholder="Qual o nome da comunidade?"
                  type="text"
                />
              </div>
              <div>
                <input
                  aria-label="URL da capa da comunidade?"
                  name="imagem"
                  placeholder="URL da capa da comunidade?"
                  type="text"
                  defaultValue="https://picsum.photos/200"
                />
              </div>
              <button>
                Criar comunidade
              </button>
            </form>
          </Box>
        </div>

        <div className="profileRelationsArea" style={{ gridArea: 'profileRelationsArea' }}>
          <ProfileRelationsBox titulo="Seguidores" itens={seguidores} />
          
          <ProfileRelationsBoxWrapper >
            <p className="smallTitle">Pessoas da comunidade ({pessoasFavoritas.length})</p>

            <ul>
              {pessoasFavoritas.map((itemAtual) => {
                return (
                  <li key={itemAtual}>
                    <a href={`https://github.com/${itemAtual}`} target="_blank">
                      <img src={`https://github.com/${itemAtual}.png`} />
                      <span>{itemAtual}</span>
                    </a>
                  </li>
                )
              })}
            </ul>
          </ProfileRelationsBoxWrapper>

          <ProfileRelationsBoxWrapper >
            <p className="smallTitle">Comunidades ({comunidades.length})</p>

            <ul>
              {comunidades.map((itemAtual) => {
                return (
                  <li key={itemAtual.id}>
                    <a href={`/community/${itemAtual.id}`}>
                      <img src={`${itemAtual.imageUrl}`} />
                      <span>{itemAtual.title}</span>
                    </a>
                  </li>
                )
              })}
            </ul>
          </ProfileRelationsBoxWrapper>
          
        </div>
        
      </MainGrid>
    </>
  )
}
