// pages/index.tsx
"use client";
import React, { useState } from "react";
import Select from "../components/Select";
import Radio from "../components/Radio";
import MultiSelect from "../components/MultiSelect";
import TextInput from "../components/TextInput";

const Home: React.FC = () => {
  // --- Estados do Formulário ---
  const [comunidade, setComunidade] = useState("");
  const [universidade, setUniversidade] = useState("");
  const [curso, setCurso] = useState("");
  const [outroCurso, setOutroCurso] = useState("");
  const [acessoLeitura, setAcessoLeitura] = useState<string[]>([]);
  const [outroAcessoLeitura, setOutroAcessoLeitura] = useState("");
  const [acessoInternet, setAcessoInternet] = useState("");
  const [anosInternet, setAnosInternet] = useState("");
  const [equipamentos, setEquipamentos] = useState<string[]>([]);
  const [outroEquipamento, setOutroEquipamento] = useState("");
  const [avaliacaoTecUni, setAvaliacaoTecUni] = useState("");

  const [freqAcessoGeral, setFreqAcessoGeral] = useState("");

  const [freqLeituraTextosLongos, setFreqLeituraTextosLongos] = useState("");
  const [justificativaLeituraLonga, setJustificativaLeituraLonga] = useState("");
  const [impactoTecnologiaComunidade, setImpactoTecnologiaComunidade] = useState("");
  const [avaliacaoFormacao, setAvaliacaoFormacao] = useState("");
  const [experienciaAntesDepois, setExperienciaAntesDepois] = useState("");

  const [email, setEmail] = useState(""); // Estado para 'email'

  const [submitStatus, setSubmitStatus] = useState<null | "success" | "error" | "loading">(null);
  const [validationMessage, setValidationMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // --- Opções dos Campos (mantidas) ---
  const universidadeOptions = ["UFBA - Universidade Federal da Bahia","UFRB - Universidade Federal do Recôncavo da Bahia","UFOB	- Universidade Federal do Oeste da Bahia", "UFSB	- Universidade Federal do Sul da Bahia", "UNIVASF Universidade Federal do Vale do São Francisco","UNILAB	Universidade da Integração Internacional da Lusofonia Afro-Brasileira", "UNEB Universidade do Estado da Bahia", "IFBA Instituto Federal da Bahia", "IFBAIANO Instituto Federal Baiano", "UEFS	Universidade Estadual de Feira de Santana", "UESC	Universidade Estadual de Santa Cruz","UESB – Universidade Estadual do Sudoeste da Bahia"];
  const cursosOptions = [
    "História", "Filosofia", "Direito", "Economia", "Biblioteconomia", "Medicina",
    "Enfermagem", "Engenharia Civil", "Engenharia Ambiental", "Computação",
    "Pedagogia", "Letras", "Cinema", "BI de Humanidades", "Museologia",
    "BI de Artes", "BI de Saúde", "BI de Ciência e Tecnologia", "Outro",
  ];
  const acessoLeituraOptions = [
    "Biblioteca da comunidade", "Biblioteca da escola", "Biblioteca de um(a) amigo(a)",
    "Ponto de leitura da comunidade", "Não se aplica", "Outro",
  ];
  const acessoInternetOptions = [
    "Muito bom", "Ruim", "Regular", "Bom", "Ótimo",
    "Não se aplica. Na comunidade onde morava não tem acesso à internet",
  ];
  const anosInternetOptions = [
    "Menos de 2 anos", "De 2 a 5 anos", "De 5 anos a 8 anos", "Mais de 8 anos", "Não sei informar"
  ];
  const equipamentosOptions = [
    "Celular smartphone", "Computador/notebook pessoal", "Tablet", "E-reader (ex: Kindle)",
    "Computador compartilhado (família)", "Computador compartilhado (biblioteca)",
    "Não se aplica.", "Outro",
  ];
  const avaliacaoOptions = ["Muito bom", "Ruim", "Regular", "Bom", "Ótimo"];
  const frequenciaLeituraOptions = ["Nunca", "Raramente", "Ocasionalmente", "Frequentemente", "Muito frequentemente"];

  const isFormValid = () => {
    // ATUALIZADO: Adicionando validação para o campo 'email'
    if (
      !comunidade.trim() || !universidade || !curso ||
      (curso === "Outro" && !outroCurso.trim()) ||
      acessoLeitura.length === 0 ||
      (acessoLeitura.includes("Outro") && !outroAcessoLeitura.trim()) ||
      !acessoInternet || !anosInternet || equipamentos.length === 0 ||
      (equipamentos.includes("Outro") && !outroEquipamento.trim()) ||
      !avaliacaoTecUni ||
      !freqAcessoGeral ||
      !freqLeituraTextosLongos ||
      !justificativaLeituraLonga.trim() ||
      !impactoTecnologiaComunidade || !avaliacaoFormacao || !experienciaAntesDepois.trim() ||
      !email.trim() // NOVO: Validação obrigatória do email
    ) {
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationMessage(null);
    setErrorMessage(null);

    if (!isFormValid()) {
      setValidationMessage("Por favor, preencha todos os campos obrigatórios antes de enviar.");
      window.scrollTo(0, document.body.scrollHeight);
      return;
    }

    setSubmitStatus("loading");

    const finalEquipamentos = equipamentos.includes("Outro")
      ? [...equipamentos.filter((eq) => eq !== "Outro"), outroEquipamento]
      : equipamentos;
    const finalAcessoLeitura = acessoLeitura.includes("Outro")
      ? [...acessoLeitura.filter((ac) => ac !== "Outro"), outroAcessoLeitura]
      : acessoLeitura;
    const finalCurso = curso === "Outro" ? outroCurso : curso;

    const formData = {
      comunidade,
      universidade,
      curso: finalCurso,
      acessoLeitura: finalAcessoLeitura,
      acessoInternet,
      anosInternet,
      equipamentos: finalEquipamentos,
      avaliacaoTecUni,
      freqAcessoGeral,
      freqLeituraTextosLongos,
      justificativaLeituraLonga,
      impactoTecnologiaComunidade,
      avaliacaoFormacao,
      experienciaAntesDepois,
      email,
    };

    try {
      const response = await fetch("/api/submit-form", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus("success");
        setTimeout(() => window.location.reload(), 3000);
      } else {
        const errorData = await response.json();
        if (response.status === 409 && errorData.error && errorData.error.includes("duplicate key value violates unique constraint")) {
            setErrorMessage("Erro: Este e-mail já foi utilizado para enviar uma resposta. Por favor, utilize outro e-mail.");
        } else {
            setErrorMessage(errorData.message || "Ocorreu um erro desconhecido ao enviar o formulário.");
        }
        setSubmitStatus("error");
      }
    } catch (error) {
      console.error("Falha ao conectar com a API:", error);
      setErrorMessage("Erro de conexão. Verifique sua internet ou tente novamente mais tarde.");
      setSubmitStatus("error");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-lg p-8">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-center text-blue-800 mb-6">
            📚 QUESTIONÁRIO - TECNOLOGIA E PRÁTICAS LEITORAS
          </h1>
          <div className="text-left text-gray-700 space-y-3">
            <p><b>Estimado(a) Discente,</b></p>
            <p>Este formulário tem como objetivo compreender os reflexos das tecnologias de informação e comunicação nas práticas leitoras de jovens universitários quilombolas.</p>
            <p>Sua participação colaborará para o andamento de meu Trabalho de Conclusão de Curso do Bacharelado em Biblioteconomia e Documentação na Universidade Federal da Bahia.</p>
            <p>Registro que será assegurado o sigilo de sua identificação pessoal e será empregado código alfanumérico para garantir o sigilo nas publicações dos artigos ou trabalhos em evento.</p>
            <p>Atendendo ao rigor ético da pesquisa, informamos que ao responder este questionário você consente que suas respostas sejam utilizadas nos trabalhos acadêmicos/científicos.</p>
            <p>Agradeço sua colaboração,</p>
            <p><b>José Vanderlei do Nascimento Neto</b><br />Discente da Universidade Federal da Bahia</p>
          </div>
          <p className="text-center text-black font-bold my-6">
            ✊🏿 Resistência Quilombola ✊🏿
          </p>
        </header>

        <form onSubmit={handleSubmit} className="space-y-8 text-black">
          {/* --- Bloco: Perfil do Universitário --- */}
          <div>
            <h2 className="text-2xl font-bold text-blue-700 border-b-2 border-blue-200 pb-2 mb-4">PERFIL DO UNIVERSITÁRIO QUILOMBOLA</h2>
            <div className="space-y-6">
              <TextInput label="1. Qual o nome da comunidade quilombola/Estado você nasceu?" value={comunidade} onChange={setComunidade} />
              <Radio label="2. Qual universidade você está cursando?" options={universidadeOptions} value={universidade} onChange={setUniversidade} name="universidade" />
              <Select label="3. Qual o curso que está matriculado?" options={cursosOptions} value={curso} onChange={setCurso} />
              {curso === "Outro" && <TextInput label="Especifique o curso" value={outroCurso} onChange={setOutroCurso} />}
              <MultiSelect label="4. Como você acessava o livro e a leitura na comunidade quilombola que você nasceu? (Marque todas as opções que se aplicam)" options={acessoLeituraOptions} value={acessoLeitura} onChange={setAcessoLeitura} />
              {acessoLeitura.includes("Outro") && <TextInput label="Especifique outra forma de acesso" value={outroAcessoLeitura} onChange={setOutroAcessoLeitura} />}
            </div>
          </div>


          {/* --- Bloco: Tecnologia --- */}
           <div>
            <h2 className="text-2xl font-bold text-blue-700 border-b-2 border-blue-200 pb-2 mb-4">TECNOLOGIA DE INFORMAÇÃO E COMUNICAÇÃO</h2>
            <div className="space-y-6">
              <Radio label="5. Como é o acesso à internet na comunidade onde você morava?" options={acessoInternetOptions} value={acessoInternet} onChange={setAcessoInternet} name="acessoInternet" />
              <Radio label="6. Há quantos anos a comunidade onde você morava dispõe de internet?" options={anosInternetOptions} value={anosInternet} onChange={setAnosInternet} name="anosInternet" />
              <MultiSelect label="7. Marque o(s) equipamento(s) que você utilizava para acessar o livro e a leitura na comunidade onde você morava antes de ingressar na universidade. (Marque todos que se aplicam)" options={equipamentosOptions} value={equipamentos} onChange={setEquipamentos} />
              {equipamentos.includes("Outro") && <TextInput label="Especifique o equipamento" value={outroEquipamento} onChange={setOutroEquipamento} />}
              <Radio label="8. Como você avalia a disponibilização de recursos tecnológicos para acesso ao livro e a leitura na universidade onde estuda?" options={avaliacaoOptions} value={avaliacaoTecUni} onChange={setAvaliacaoTecUni} name="avaliacaoTecUni" />
            </div>
           </div>


          {/* --- Bloco: Práticas Leitoras --- */}
          <div>
            <h2 className="text-2xl font-bold text-blue-700 border-b-2 border-blue-200 pb-2 mb-4">PRÁTICAS LEITORAS</h2>
            <div className="space-y-6">
              <Radio label="9. Depois que ingressou na universidade, qual a frequência que você tem acesso ao livro e a leitura?" options={frequenciaLeituraOptions} value={freqAcessoGeral} onChange={setFreqAcessoGeral} name="freqAcessoGeral" />
              <Radio label="10. Com que frequência você realiza leitura de textos longos (+20 páginas)?" options={frequenciaLeituraOptions} value={freqLeituraTextosLongos} onChange={setFreqLeituraTextosLongos} name="freqLeituraTextosLongos" />
              <Radio label="11. Como você avalia o impacto da tecnologia de informação e comunicação no acesso ao livro e a leitura na comunidade onde você morava?" options={avaliacaoOptions} value={impactoTecnologiaComunidade} onChange={setImpactoTecnologiaComunidade} name="impactoTecnologiaComunidade" />
              <TextInput label="12. Justifique brevemente a resposta da pergunta anterior." value={justificativaLeituraLonga} onChange={setJustificativaLeituraLonga} />
              <Radio label="13. Como você avalia o acesso ao livro e a leitura que auxiliam sua formação acadêmica, a partir da tecnologia de informação e comunicação?" options={avaliacaoOptions} value={avaliacaoFormacao} onChange={setAvaliacaoFormacao} name="avaliacaoFormacao" />
              <TextInput label="14. Compartilhe brevemente duas experiências sobre tecnologia de informação e comunicação e o acesso ao livro e a leitura, uma antes e outra depois de seu ingresso na universidade." value={experienciaAntesDepois} onChange={setExperienciaAntesDepois} />
            </div>
          </div>

          {/* Campo de Email - Agora obrigatório */}
          <div className="mt-8 pt-6 border-t border-blue-200">
             <h2 className="text-2xl font-bold text-blue-700 border-b-2 border-blue-200 pb-2 mb-4">E-email</h2>
             <TextInput
               label="15. Por favor, digite seu e-mail para contato." // Label indicando que é obrigatório
               value={email}
               onChange={setEmail}
               type="email"
               required // Atributo HTML 'required' para validação básica do navegador
             />
          </div>

          {/* --- Mensagens e Botão de Envio --- */}
          <div className="mt-8 pt-6 border-t">
            {validationMessage && <p className="text-red-600 text-center mb-4 font-semibold">{validationMessage}</p>}
            {errorMessage && <p className="text-red-600 text-center mb-4">**Erro:** {errorMessage}</p>}

            {submitStatus === "success" && <p className="text-green-600 font-semibold text-center">Formulário enviado com sucesso! A página será atualizada em breve...</p>}
            {submitStatus === "loading" && <p className="text-blue-600 font-semibold text-center">Enviando...</p>}

            {submitStatus !== "loading" && submitStatus !== "success" && (
              <button type="submit" className="w-full py-3 bg-blue-700 text-white rounded-lg font-semibold hover:bg-blue-800 transition-colors duration-300">
                Enviar Respostas
              </button>
            )}
          </div>
        </form>

        <footer className="mt-12 text-center text-sm text-gray-500">
          <p>
            Desenvolvido por <a href="http://lattes.cnpq.br/2822898709875528" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Vanderlei Neto</a> - 2025
          </p>
          <p>Orientado pela professora doutora <a href=" http://lattes.cnpq.br/2274233937243548" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Kátia Rodrigues</a></p>
        </footer>
      </div>
    </div>
  );
};

export default Home;