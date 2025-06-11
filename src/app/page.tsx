// pages/index.tsx
"use client";
import React, { useState } from "react";
import Select from "../components/Select";
import Radio from "../components/Radio";
import MultiSelect from "../components/MultiSelect";
import TextInput from "../components/TextInput";

const Home: React.FC = () => {
  // Estados do formulário (mantidos como na última versão)
  const [comunidade, setComunidade] = useState("");
  const [universidade, setUniversidade] = useState("");
  const [curso, setCurso] = useState("");
  const [outroCurso, setOutroCurso] = useState("");
  const [acessoLeitura, setAcessoLeitura] = useState<string[]>([]);
  const [acessoInternet, setAcessoInternet] = useState("");
  const [anosInternet, setAnosInternet] = useState("");
  const [equipamentos, setEquipamentos] = useState<string[]>([]);
  const [outroEquipamento, setOutroEquipamento] = useState("");

  const [avaliacaoTecUni, setAvaliacaoTecUni] = useState("");

  const [freqAcessoLivroImpresso, setFreqAcessoLivroImpresso] = useState("");
  const [freqAcessoEbookPdf, setFreqAcessoEbookPdf] = useState("");
  const [freqAcessoRedeSocial, setFreqAcessoRedeSocial] = useState("");
  const [freqAcessoArtigoCientifico, setFreqAcessoArtigoCientifico] = useState("");
  const [freqAcessoCopiaLivro, setFreqAcessoCopiaLivro] = useState("");

  const [freqLeituraTextosLongosImpresso, setFreqLeituraTextosLongosImpresso] = useState("");
  const [freqLeituraTextosLongosEbookPdf, setFreqLeituraTextosLongosEbookPdf] = useState("");
  const [freqLeituraTextosLongosArtigoCientifico, setFreqLeituraTextosLongosArtigoCientifico] = useState("");
  const [freqLeituraTextosLongosCopiaLivro, setFreqLeituraTextosLongosCopiaLivro] = useState("");

  const [impactoTecnologia, setImpactoTecnologia] = useState("");
  const [avaliacaoFormacao, setAvaliacaoFormacao] = useState("");
  const [experienciaAntesDepois, setExperienciaAntesDepois] = useState("");

  const [submitStatus, setSubmitStatus] = useState<null | "success" | "error">(null);
  const [validationMessage, setValidationMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // New state for API errors

  // Opções dos selects, rádios, múltiplos (mantidos como na última versão)
  const universidadeOptions = ["Universidade Federal do Recôncavo da Bahia", "Universidade Federal da Bahia"];
  const cursosOptions = [
    "História", "Filosofia", "Direito", "Economia", "Biblioteconomia", "Medicina",
    "Enfermagem", "Engenharia Civil", "Engenharia Ambiental", "Computação",
    "Pedagogia", "Letras", "Cinema", "BI de Humanidades", "Museologia",
    "BI de Artes", "BI de Saúde", "BI de Ciência e Tecnologia", "Outro",
  ];
  const acessoLeituraOptions = [
    "biblioteca da comunidade", "biblioteca da escola", "biblioteca de uma amiga",
    "ponto de leitura da comunidade",
  ];
  const acessoInternetOptions = [
    "Muito bom", "Ruim", "Regular", "Bom", "Ótimo",
    "Não se aplica. Na comunidade onde morava não tem acesso à internet",
  ];
  const anosInternetOptions = [
    "Menos de 2 anos", "De 2 a 5 anos", "De 5 anos a 8 anos", "Mais de 8 anos",
  ];
  const equipamentosOptions = [
    "Celular smartphone", "Computador/notebook pessoal", "Tablet", "E-reader (ex: Kindle)",
    "Computador compartilhado (família)", "Computador compartilhado (biblioteca)",
    "Não se aplica.", "Outro",
  ];
  const avaliacaoOptions = ["Muito bom", "Ruim", "Regular", "Bom", "Ótimo"];
  const frequenciaLeituraOptions = ["Nunca", "Raramente", "Ocasionalmente", "Frequentemente", "Muito frequentemente"];

  const isFormValid = () => {
    // Check all required fields (as before)
    if (
      !comunidade.trim() ||
      !universidade ||
      !curso ||
      (curso === "Outro" && !outroCurso.trim()) ||
      acessoLeitura.length === 0 ||
      !acessoInternet ||
      !anosInternet ||
      equipamentos.length === 0 ||
      (equipamentos.includes("Outro") && !outroEquipamento.trim()) ||
      !avaliacaoTecUni ||
      !freqAcessoLivroImpresso ||
      !freqAcessoEbookPdf ||
      !freqAcessoRedeSocial ||
      !freqAcessoArtigoCientifico ||
      !freqAcessoCopiaLivro ||
      !freqLeituraTextosLongosImpresso ||
      !freqLeituraTextosLongosEbookPdf ||
      !freqLeituraTextosLongosArtigoCientifico ||
      !freqLeituraTextosLongosCopiaLivro ||
      !impactoTecnologia ||
      !avaliacaoFormacao ||
      !experienciaAntesDepois.trim()
    ) {
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevents default form submission/page reload

    // Reset messages
    setValidationMessage(null);
    setErrorMessage(null);
    setSubmitStatus(null);

    if (!isFormValid()) {
      setValidationMessage("Por favor, preencha todos os campos obrigatórios antes de enviar.");
      return; // Stop here if form is not valid
    }

    const finalEquipamentos = equipamentos.includes("Outro")
      ? [...equipamentos.filter((eq) => eq !== "Outro"), outroEquipamento]
      : equipamentos;
    const finalCurso = curso === "Outro" ? outroCurso : curso;

    const formData = {
      comunidade,
      universidade,
      curso: finalCurso,
      acessoLeitura,
      acessoInternet,
      anosInternet,
      equipamentos: finalEquipamentos,
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
    };

    try {
      const response = await fetch("/api/submit-form", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus("success");
        // Clear form after success
        // You might want to reset state variables here instead of reloading for a smoother UX
        // setComunidade(''); etc.
        setTimeout(() => {
          window.location.reload(); // Reloads the page to clear the form
        }, 2000);
      } else {
        // If response is not OK (e.g., 500 error from backend)
        const errorData = await response.json(); // Try to parse backend error message
        setErrorMessage(errorData.message || "Ocorreu um erro desconhecido ao enviar o formulário.");
        setSubmitStatus("error");
        console.error("Backend error response:", errorData); // Log detailed error
      }
    } catch (error) {
      // Catch network errors or issues before the backend response
      console.error("Erro ao enviar formulário:", error);
      setErrorMessage("Erro de conexão. Verifique sua internet ou tente novamente mais tarde.");
      setSubmitStatus("error");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-lg p-8">
        <h1 className="text-4xl font-bold text-center text-blue-800 mb-2">
          📚 QUESTIONÁRIO - TECNOLOGIA E PRÁTICAS LEITORAS
        </h1>
        <p className="text-center text-gray-700 font-semibold mb-2">
          Estudantes Quilombolas da UFBA  perguntas
        </p>
        <p className="text-center text-gray-700 mb-4">
          Pesquisa para o TCC em Biblioteconomia e Documentação - UFBA
        </p>
        <p className="text-sm text-center text-gray-600 mb-4">
          <strong>🧠 PROBLEMA DE PESQUISA E OBJETIVO</strong>
          <br />
          Problema de pesquisa: Quais os reflexos das tecnologias de informação e
          comunicação nas práticas leitoras de jovens universitários quilombolas?
          <br />
          Objetivo geral: Compreender os reflexos das tecnologias de informação e
          comunicação nas práticas leitoras de jovens universitários quilombolas.
        </p>
        <p className="text-center text-black font-bold mb-4">
          ✊🏿 Resistência Quilombola ✊🏿
        </p>

        <form onSubmit={handleSubmit} className="space-y-6 text-black">
          <h2 className="text-2xl font-bold text-blue-700">PERFIL DO UNIVERSITÁRIO QUILOMBOLA</h2>
          <TextInput
            label="1. Qual o nome da comunidade quilombola/Estado você nasceu?"
            value={comunidade}
            onChange={setComunidade}
          />
          <Radio
            label="2. Qual universidade você está cursando?"
            options={universidadeOptions}
            value={universidade}
            onChange={setUniversidade}
            name="universidade"
          />
          <Select
            label="3. Qual o curso que está matriculado?"
            options={cursosOptions}
            value={curso}
            onChange={setCurso}
          />
          {curso === "Outro" && (
            <TextInput
              label="Especifique o curso"
              value={outroCurso}
              onChange={setOutroCurso}
            />
          )}
          <MultiSelect
            label="4. Como você acessava o livro e a leitura na comunidade quilombola que você nasceu?"
            options={acessoLeituraOptions}
            value={acessoLeitura}
            onChange={setAcessoLeitura}
          />

          <hr/>

          <h2 className="text-2xl font-bold text-blue-700">TECNOLOGIA DE INFORMAÇÃO E COMUNICAÇÃO</h2>
          <Radio
            label="5. Como é o acesso à internet na comunidade onde você morava?"
            options={acessoInternetOptions}
            value={acessoInternet}
            onChange={setAcessoInternet}
            name="acessoInternet"
          />
          <Radio
            label="6. Há quantos anos a comunidade onde você morava dispõe de internet?"
            options={anosInternetOptions}
            value={anosInternet}
            onChange={setAnosInternet}
            name="anosInternet"
          />
          <MultiSelect
            label="7. Na comunidade onde você morava, marque o(s) equipamento(s) que você utilizava para acessar o livro e a leitura antes de ingressar na universidade. (marque todos que se aplicam)"
            options={equipamentosOptions}
            value={equipamentos}
            onChange={setEquipamentos}
          />
          {equipamentos.includes("Outro") && (
            <TextInput
              label="Especifique o equipamento"
              value={outroEquipamento}
              onChange={setOutroEquipamento}
            />
          )}
          <Radio
            label="8. Como você avalia a disponibilização de recursos tecnológicos para acesso ao livro e a leitura na universidade onde estuda?"
            options={avaliacaoOptions}
            value={avaliacaoTecUni}
            onChange={setAvaliacaoTecUni}
            name="avaliacaoTecUni"
          />

          <hr/>

          <h2 className="text-2xl font-bold text-blue-700">PRÁTICAS LEITORAS</h2>

          <p className="block text-gray-700 text-sm font-bold mb-2">
            9. Depois que ingressou na universidade, qual a frequência que você tem acesso ao livro e a leitura?
          </p>
          <Radio
            label="Livro impresso (Acesso)"
            options={frequenciaLeituraOptions}
            value={freqAcessoLivroImpresso}
            onChange={setFreqAcessoLivroImpresso}
            name="freqAcessoLivroImpresso"
          />
          <Radio
            label="E-book/PDF (Acesso)"
            options={frequenciaLeituraOptions}
            value={freqAcessoEbookPdf}
            onChange={setFreqAcessoEbookPdf}
            name="freqAcessoEbookPdf"
          />
          <Radio
            label="Rede Social (Twitter, Instagram, Blog) (Acesso)"
            options={frequenciaLeituraOptions}
            value={freqAcessoRedeSocial}
            onChange={setFreqAcessoRedeSocial}
            name="freqAcessoRedeSocial"
          />
          <Radio
            label="Artigo científico online (Acesso)"
            options={frequenciaLeituraOptions}
            value={freqAcessoArtigoCientifico}
            onChange={setFreqAcessoArtigoCientifico}
            name="freqAcessoArtigoCientifico"
          />
          <Radio
            label="Cópia de livro, capítulo de livro, apostila (Acesso)"
            options={frequenciaLeituraOptions}
            value={freqAcessoCopiaLivro}
            onChange={setFreqAcessoCopiaLivro}
            name="freqAcessoCopiaLivro"
          />

          <p className="block text-gray-700 text-sm font-bold mb-2 mt-6">
            10. Com que frequência você realiza leitura de textos longos (+20 páginas)?
          </p>
          <Radio
            label="Livro impresso (Textos Longos)"
            options={frequenciaLeituraOptions}
            value={freqLeituraTextosLongosImpresso}
            onChange={setFreqLeituraTextosLongosImpresso}
            name="freqLeituraTextosLongosImpresso"
          />
          <Radio
            label="E-book/PDF (Textos Longos)"
            options={frequenciaLeituraOptions}
            value={freqLeituraTextosLongosEbookPdf}
            onChange={setFreqLeituraTextosLongosEbookPdf}
            name="freqLeituraTextosLongosEbookPdf"
          />
          <Radio
            label="Artigo científico online (Textos Longos)"
            options={frequenciaLeituraOptions}
            value={freqLeituraTextosLongosArtigoCientifico}
            onChange={setFreqLeituraTextosLongosArtigoCientifico}
            name="freqLeituraTextosLongosArtigoCientifico"
          />
          <Radio
            label="Cópia de livro, capítulo de livro, apostila (Textos Longos)"
            options={frequenciaLeituraOptions}
            value={freqLeituraTextosLongosCopiaLivro}
            onChange={setFreqLeituraTextosLongosCopiaLivro}
            name="freqLeituraTextosLongosCopiaLivro"
          />

          <Radio
            label="11. Como você avalia o impacto da tecnologia de informação e comunicação no acesso ao livro e a leitura?"
            options={avaliacaoOptions}
            value={impactoTecnologia}
            onChange={setImpactoTecnologia}
            name="impactoTecnologia"
          />

          <Radio
            label="12. Como você avalia o acesso ao livro e a leitura que auxiliam sua formação acadêmica, a partir da tecnologia de informação e comunicação?"
            options={avaliacaoOptions}
            value={avaliacaoFormacao}
            onChange={setAvaliacaoFormacao}
            name="avaliacaoFormacao"
          />

          <TextInput
            label="13. Compartilhe brevemente duas experiências sobre tecnologia de informação e comunicação e o acesso ao livro e a leitura, uma antes e outra depois de seu ingresso na universidade."
            value={experienciaAntesDepois}
            onChange={setExperienciaAntesDepois}
          />


          {validationMessage && (
            <p className="text-red-600 text-center mt-2 font-semibold">
              {validationMessage}
            </p>
          )}

          {submitStatus === "success" ? (
            <p className="text-green-600 font-semibold text-center">
              Formulário enviado com sucesso! A página será atualizada...
            </p>
          ) : (
            <button
              type="submit"
              className="w-full py-3 bg-blue-700 text-white rounded-lg font-semibold hover:bg-blue-800 transition"
            >
              Enviar
            </button>
          )}

          {errorMessage && ( // Display a specific error message from the API
            <p className="text-red-600 text-center mt-2">
              **Erro:** {errorMessage}
            </p>
          )}
        </form>

        <footer>
          <p className="text-center text-gray-600 mt-6">
            Desenvolvido por <a href="">Vanderlei Neto</a> - 2025
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Home;