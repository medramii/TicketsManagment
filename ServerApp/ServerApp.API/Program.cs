using ServerApp.API.Extensions;
using NLog;  // Ensure you have the necessary using directive

var builder = WebApplication.CreateBuilder(args);

// Load NLog configuration for Logger Service
LogManager.Setup().LoadConfigurationFromFile(Path.Combine(Directory.GetCurrentDirectory(), "nlog.config"));

// Add essential services to the container

// Configure CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("CorsPolicy", builder =>
    {
        builder.AllowAnyOrigin()
               .AllowAnyMethod()
               .AllowAnyHeader();
    });
});

// Add Controllers
builder.Services.AddControllers();

// Configure API Endpoints and Swagger
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Configure the Database Context
builder.Services.ConfigureAppDbContext(builder.Configuration);

// Configure Logger Service
builder.Services.ConfigureLoggerService();

// Configure Authentication
builder.Services.ConfigureAuthentication(builder.Configuration);

// Configure Repositories
builder.Services.ConfigureRepositories();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

// Enable CORS before
app.UseCors("CorsPolicy");

app.UseRouting();

// Authentication before Authorization
app.UseAuthentication();
app.UseAuthorization();

// Map Controllers
app.MapControllers();

app.Run();
