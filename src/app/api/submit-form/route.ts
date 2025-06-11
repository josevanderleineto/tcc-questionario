// src/app/api/submit-form/route.ts
import { Pool } from 'pg';
import { NextResponse } from 'next/server';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // Aqui ele lê a DATABASE_URL
});

export async function POST(req: Request) {
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

    // Nome da tabela deve ser o que você criou, exemplo: respostas_questionario_quilombola
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
    return NextResponse.json({ message: 'Dados inseridos com sucesso!' }, { status: 200 });
  } catch (error) {
    console.error('Erro ao inserir dados:', error);
    return NextResponse.json(
      { message: 'Erro ao inserir dados', error: (error as Error).message, dbError: error },
      { status: 500 }
    );
  }
}