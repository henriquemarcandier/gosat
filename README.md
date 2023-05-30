Olá,<br><br>

Seja mais do que bem-vindo ao Sistema de Teste da Gosat.<br><br>

Para testar o sistema baixe todo o conteúdo do mesmo para uma pasta "gosat" (pode ser outra se preferir, só tem que atentar-se para a correção da pasta certa que o sistema vai acessar).<br><br>

Pegue o arquivo "gosat.sql", que se encontra dentro da pasta e extrair para um banco mysql. Eu usei o nome gosat, mas você pode criar qualquer banco de dados, mas atente-se para corrigir este banco nos arquivos citados mais abaixo.<br><br>

Arquivos a se modificar em caso de uso de nome diferentes no banco, ou caso o seu sistema esteja instalado em outra pasta:<br><br>

- .env<br>
- public/connect.php (este arquivo é utilizado para realizar os ajax do sistema)<br><br>

Nesses arquivos repare que tem a url e o diretorio do sistema, e os dados para conexão com o banco de dados.<br><br>

Aí basta executar "http://localhost/gosat/public" (pode ser que no seu seja diferente, então coloque a pasta que é pra acessar seguida de public) para acessar o sistema.<br><br>

Se logue com as seguintes informações:<br><br>

Login: equipegosat@bhcommerce.com.br<br>
Senha: 123456padrao+<br><br>

Repare que tem à esquerda o menu do sistema, em que se você modificar alguma permissão para o seu usuário lá, repare que serão estipuladas as permissões setadas para cada página do sistema.<br><br>

Na tela inicial e na gráficos eu só deixei os html dos gráficos para vocês verem aí, não tendo conexão com o banco de dados. Mas as outras telas tem. Então, podem fazer os seus testes aí, que tudo funciona perfeitamente nele.<br><br>

Páginas:<br><br>

Página de Login<br>
Página Esqueceu sua Senha<br>
Página de Alterar Senha<br>
Página Inicial<br>
Gráficos do Sistema<br>
API<br>
Usuário<br>
Módulos<br>
Permissão<br>
Logs de Acesso<br>
Versão<br><br>

Todas as páginas foram testadas por mim e estão funcionando.<br><br>

Página que merecem resalva:<br><br>

A página de API, no menu em Integrações, o sistema começa exibindo um formulário. Se a pessoa digitar o CPF 111.111.111-11 e clicar em Consultar, o sistema verifica na API, mandada por vocês, os dados para aquele CPF e grava no banco de dados em 3 tabelas diferentes lá: a "banks", a "modalities" e a "numbers". Depois ele verifica no banco as que tem e ordena elas pelo maior valor. Caso seja interessante mudar essa ordenação, apenas modifique o campo ordem no topo da página.<br><br>

Nas páginas Usuário, Módulos e Versão, repare que tem a opção de criar novo, visualizar, editar e excluir um registro. O sistema sempre verifica se o usuário tem permissão para acessar cada página dessas.<br><br>

Bem, esse é o sistema desenvolvido por mim. Qualquer coisa, me comuniquem através do email henrique.marcandier@gmail.com .