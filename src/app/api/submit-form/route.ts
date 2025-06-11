import { Pool } from 'pg';
import { NextResponse } from 'next/server';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Função para configurar CORS dinamicamente
function getCorsHeaders(origin: string) {
  const allowedOrigins = [
    'https://tcc-questionario.vercel.app',
    'https://www.pesquisatecnologiaepraticasleitoras.xyz',
  ];

  const isAllowed = allowedOrigins.includes(origin);

  return {
    'Access-Control-Allow-Origin': isAllowed ? origin : '',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };
}

// Lidando com o envio do formulário
export async function POST(req: Request) {
  const origin = req.headers.get('origin') || '';

  try {
    const {
      comunidade,
      universidade,
      curso,
      acessoLeitura,
      acessoInternet,
      anosInternet,
      equipamentos,
      avaliacaoTecUni,
      freqAcessoLivroImpresso,
      freqAcessoEbookPdf,
      freqAcessoRedeSocial,
      freqAcessoArtigoCientifico,
      freqAcessoCopiaLivro,
      freqLeituraTextosLongosImpresso,
      freqLeituraTextosLongosEbookPdf,
      freqLeituraTextosLongosArtigoCientifico,
      freqLeituraTextosLongosCopiaLivro,
      impactoTecnologia,
      avaliacaoFormacao,
      experienciaAntesDepois,
    } = await req.json();

    const client = await pool.connect();

    const query = `
      INSERT INTO respostas_questionario_quilombola (
        comunidade_natal,
        universidade,
        curso,
        acesso_leitura_comunidade,
        acesso_internet_comunidade,
        anos_internet_comunidade,
        equipamentos_utilizados,
        avaliacao_tecnologia_universidade,
        frequencia_acesso_livro_impresso,
        frequencia_acesso_ebook_pdf,
        frequencia_acesso_rede_social,
        frequencia_acesso_artigo_cientifico,
        frequencia_acesso_copia_livro,
        frequencia_leitura_textos_longos_impresso,
        frequencia_leitura_textos_longos_ebook_pdf,
        frequencia_leitura_textos_longos_artigo_cientifico,
        frequencia_leitura_textos_longos_copia_livro,
        avaliacao_impacto_tecnologia,
        avaliacao_formacao_tecnologia,
        experiencia_antes_depois,
        data_envio
      ) VALUES (
        $1, $2, $3, $4, $5, $6, $7, $8, $9, $10,
        $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, NOW()
      );
    `;

    const values = [
      comunidade,
      universidade,
      curso,
      acessoLeitura.join(', '),
      acessoInternet,
      anosInternet,
      equipamentos.join(', '),
      avaliacaoTecUni,
      freqAcessoLivroImpresso,
      freqAcessoEbookPdf,
      freqAcessoRedeSocial,
      freqAcessoArtigoCientifico,
      freqAcessoCopiaLivro,
      freqLeituraTextosLongosImpresso,
      freqLeituraTextosLongosEbookPdf,
      freqLeituraTextosLongosArtigoCientifico,
      freqLeituraTextosLongosCopiaLivro,
      impactoTecnologia,
      avaliacaoFormacao,
      experienciaAntesDepois,
    ];

    await client.query(query, values);
    client.release();

    return NextResponse.json(
      { message: 'Dados inseridos com sucesso!' },
      { status: 200, headers: getCorsHeaders(origin) }
    );
  } catch (error) {
    console.error('Erro ao inserir dados:', error);
    return NextResponse.json(
      { message: 'Erro ao inserir dados', error: (error as Error).message },
      { status: 500, headers: getCorsHeaders(origin) }
    );
  }
}

// Tratamento da requisição OPTIONS (pré-flight)
export async function OPTIONS(req: Request) {
  const origin = req.headers.get('origin') || '';
  return new Response(null, {
    status: 204,
    headers: getCorsHeaders(origin),
  });
}
