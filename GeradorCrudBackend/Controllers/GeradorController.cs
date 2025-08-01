using Microsoft.AspNetCore.Mvc;
using GeradorCrudBackend.Models;
using System.Text;

namespace GeradorCrudBackend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class GeradorController : ControllerBase
    {
        [HttpPost("gerar")]
        public IActionResult Gerar([FromBody] EntidadeModel model)
        {
            if (model == null || string.IsNullOrEmpty(model.Entidade))
                return BadRequest("Dados inválidos.");

            string codigo = GerarClasse(model);

            string caminho = Path.Combine("output", $"{model.Entidade}.cs");
            Directory.CreateDirectory("output");
            System.IO.File.WriteAllText(caminho, codigo);

            return Ok(new { mensagem = "Classe gerada com sucesso!", caminho });
        }

        private string GerarClasse(EntidadeModel model)
        {
            var sb = new StringBuilder();
            sb.AppendLine("public class " + model.Entidade);
            sb.AppendLine("{");

            foreach (var campo in model.Campos)
            {
                sb.AppendLine($"    public {MapearTipo(campo.Tipo)} {campo.Nome} {{ get; set; }}");
            }

            sb.AppendLine("}");
            return sb.ToString();
        }

        private string MapearTipo(string tipo) => tipo.ToLower() switch
        {
            "int" => "int",
            "decimal" => "decimal",
            "bool" => "bool",
            "datetime" => "DateTime",
            _ => "string"
        };
    }
}