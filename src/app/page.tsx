"use client";
import React, { useState } from "react";
import Select from "../components/Select";
import Radio from "../components/Radio";
import MultiSelect from "../components/MultiSelect";
import TextInput from "../components/TextInput";

const Home: React.FC = () => {
  // Estados do formulário
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
  const [frequenciaAcessoLivro, setFrequenciaAcessoLivro] = useState("");
  const [frequenciaLeituraTextos, setFrequenciaLeituraTextos] = useState("");

  const [impactoTecnologia, setImpactoTecnologia] = useState("");
  const [avaliacaoFormacao, setAvaliacaoFormacao] = useState("");
  const [experienciaAntes, setExperienciaAntes] = useState("");
  const [experienciaDepois, setExperienciaDepois] = useState("");

  // Estado para controle da mensagem de sucesso
  const [submitStatus, setSubmitStatus] = useState<null | "success" | "error">(null);

  // Opções dos selects, rádios, múltiplos
  const universidadeOptions = ["UFBA", "UFRB"];
  const cursosOptions = [
    "História",
    "Filosofia",
    "Direito",
    "Economia",
    "Biblioteconomia",
    "Medicina",
    "Enfermagem",
    "Engenharia Civil",
    "Engenharia Ambiental",
    "Computação",
    "Pedagogia",
    "Letras",
    "Cinema",
    "BI de Humanidades",
    "Museologia",
    "BI de Artes",
    "BI de Saúde",
    "BI de Ciência e Tecnologia",
    "Outro",
  ];
  const acessoLeituraOptions = [
    "Biblioteca da comunidade",
    "Biblioteca da escola",
    "Biblioteca de uma amiga",
    "Ponto de leitura da comunidade",
  ];
  const acessoInternetOptions = [
    "Muito bom",
    "Bom",
    "Regular",
    "Ruim",
    "Ótimo",
    "Não se aplica. Na comunidade onde morava não tem acesso à internet",
  ];
  const anosInternetOptions = [
    "Menos de 2 anos",
    "De 2 a 5 anos",
    "De 5 a 8 anos",
    "Mais de 8 anos",
  ];
  const equipamentosOptions = [
    "Celular smartphone",
    "Computador/notebook pessoal",
    "Tablet",
    "E-reader (ex: Kindle)",
    "Computador compartilhado (família)",
    "Computador compartilhado (biblioteca)",
    "Não se aplica",
    "Outro",
  ];
  const avaliacaoOptions = ["Muito bom", "Bom", "Regular", "Ruim", "Ótimo"];
  const frequenciaOptions = ["Diariamente", "Semanalmente", "Mensalmente", "Raramente"];

  const isFormValid = () => {
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
      !frequenciaAcessoLivro ||
      !frequenciaLeituraTextos ||
      !impactoTecnologia.trim() ||
      !avaliacaoFormacao ||
      !experienciaAntes.trim() ||
      !experienciaDepois.trim()
    ) {
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isFormValid()) {
      alert("Por favor, preencha todos os campos obrigatórios antes de enviar.");
      return;
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
      frequenciaAcessoLivro,
      frequenciaLeituraTextos,
      impactoTecnologia,
      avaliacaoFormacao,
      experienciaAntes,
      experienciaDepois,
    };

    try {
      const response = await fetch("/api/submit-form", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus("success");
        // Aguarda 2 segundos e dá reload da página para limpar tudo
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      console.error("Erro ao enviar formulário:", error);
      setSubmitStatus("error");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-lg p-8">
        <h1 className="text-4xl font-bold text-center text-blue-800 mb-2">
          📚 Formulário de Pesquisa
        </h1>
        <p className="text-center text-gray-700 font-semibold">
          Tecnologias e Práticas Leitoras - Estudantes Quilombolas da UFBA/UFRB
        </p>
        <p className="text-center text-gray-700 mb-2">
          Pesquisa para o TCC em Biblioteconomia e Documentação - UFBA
        </p>
        <p className="text-center text-black font-bold mb-1">
          ✊🏿 Resistência Quilombola ✊🏿
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

        <form onSubmit={handleSubmit} className="space-y-6 text-black">
          <TextInput
            label="1. Qual o nome da comunidade quilombola/Estado onde você nasceu?"
            value={comunidade}
            onChange={setComunidade}
          />
          <Select
            label="2. Qual universidade você está cursando?"
            options={universidadeOptions}
            value={universidade}
            onChange={setUniversidade}
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
            label="4. Como você acessava o livro e a leitura na comunidade onde nasceu?"
            options={acessoLeituraOptions}
            value={acessoLeitura}
            onChange={setAcessoLeitura}
          />
          <Radio
            label="5. Como é o acesso à internet na comunidade onde você morava?"
            options={acessoInternetOptions}
            value={acessoInternet}
            onChange={setAcessoInternet}
          />
          <Select
            label="6. Há quantos anos a comunidade dispõe de internet?"
            options={anosInternetOptions}
            value={anosInternet}
            onChange={setAnosInternet}
          />
          <MultiSelect
            label="7. Quais equipamentos você utilizava para acessar leitura antes da universidade?"
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
            label="1. Como você avalia a tecnologia na sua universidade?"
            options={avaliacaoOptions}
            value={avaliacaoTecUni}
            onChange={setAvaliacaoTecUni}
          />

          <Radio
            label="14. Com que frequência você acessa livros da biblioteca?"
            options={frequenciaOptions}
            value={frequenciaAcessoLivro}
            onChange={setFrequenciaAcessoLivro}
          />

          <Radio
            label="15. Com que frequência você lê textos acadêmicos?"
            options={frequenciaOptions}
            value={frequenciaLeituraTextos}
            onChange={setFrequenciaLeituraTextos}
          />

          <TextInput
            label="2. Qual o impacto da tecnologia nas suas práticas de leitura?"
            value={impactoTecnologia}
            onChange={setImpactoTecnologia}
          />

          <Radio
            label="3. Como você avalia a formação que recebeu para uso das tecnologias?"
            options={avaliacaoOptions}
            value={avaliacaoFormacao}
            onChange={setAvaliacaoFormacao}
          />

          <TextInput
            label="4. Conte sobre sua experiência com leitura antes da universidade"
            value={experienciaAntes}
            onChange={setExperienciaAntes}
          />

          <TextInput
            label="5. Conte sobre sua experiência com leitura depois de entrar na universidade"
            value={experienciaDepois}
            onChange={setExperienciaDepois}
          />

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

          {submitStatus === "error" && (
            <p className="text-red-600 text-center mt-2">
              Ocorreu um erro ao enviar o formulário. Tente novamente.
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default Home;

