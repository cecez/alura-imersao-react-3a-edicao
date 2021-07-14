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

export default function Home() {

  const gitHubUsername = 'cecez';
  const pessoasFavoritas = ['cecez', 'peas', 'omariosouto'];

  const [comunidades, setComunidades] = React.useState([{
    id: '1231',
    titulo: 'Comunidade 1', 
    imagem: 'https://picsum.photos/200?1'
  },
  {
    id: '12312',
    titulo: 'Comunidade 2', 
    imagem: 'https://picsum.photos/200?2'
  }])

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
                  id: new Date().toISOString(),
                  titulo: dadosDoFormulario.get('titulo'), 
                  imagem: dadosDoFormulario.get('imagem')
                };

                setComunidades([...comunidades, novaComunidade]);
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
                  value="https://picsum.photos/200"
                />
              </div>
              <button>
                Criar comunidade
              </button>
            </form>
          </Box>
        </div>

        <div className="profileRelationsArea" style={{ gridArea: 'profileRelationsArea' }}>
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
                    <a href={`/community/${itemAtual.titulo}`}>
                      <img src={`${itemAtual.imagem}`} />
                      <span>{itemAtual.titulo}</span>
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
