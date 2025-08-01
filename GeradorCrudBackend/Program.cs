using GeradorCrudBackend.Models;

var builder = WebApplication.CreateBuilder(args);

// Adiciona serviços da API
builder.Services.AddControllers();

// Habilita CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", builder =>
    {
        builder.AllowAnyOrigin()
               .AllowAnyMethod()
               .AllowAnyHeader();
    });
});

var app = builder.Build();

// Middleware do CORS
app.UseCors("AllowAll");

// Middleware da API
app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();

app.Run();
