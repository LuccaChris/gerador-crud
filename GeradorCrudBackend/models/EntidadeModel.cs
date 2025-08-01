using System.Collections.Generic;

namespace GeradorCrudBackend.Models
{
    public class EntidadeModel
    {
        public string Entidade { get; set; }
        public List<Campo> Campos { get; set; }
    }
}
