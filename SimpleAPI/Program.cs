using System.Text.Json.Serialization;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
        policy
            .WithOrigins("https://simpleapi-blond.vercel.app")
            .AllowAnyHeader()
            .AllowAnyMethod()
    );
});

var app = builder.Build();

app.UseSwagger();
app.UseSwaggerUI();
app.UseCors("AllowFrontend");


app.MapGet("/", () => Results.Redirect("/swagger"));

app.MapPost("/sort", (SortRequest body) =>
{
    var data = body.Data;

    if (string.IsNullOrWhiteSpace(data))
        return Results.Ok(new SortResponse(Array.Empty<string>()));

    var chars = data
        .Select(c => c.ToString())
        .OrderBy(s => s, StringComparer.Ordinal)
        .ToArray();

    return Results.Ok(new SortResponse(chars));
});

app.Run();

public sealed record SortRequest(
    [property: JsonPropertyName("data")] string? Data
);

public sealed record SortResponse(
    [property: JsonPropertyName("word")] string[] Word
);