FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
WORKDIR /SimpleAPI

COPY . .
RUN dotnet restore ./SimpleAPI.csproj
RUN dotnet publish ./SimpleAPI.csproj -c Release -o /app/publish

FROM mcr.microsoft.com/dotnet/aspnet:10.0 AS runtime
WORKDIR /app
COPY --from=build /app/publish .
ENV ASPNETCORE_URLS=http://0.0.0.0:10000
EXPOSE 10000
ENTRYPOINT ["dotnet", "SimpleAPI.dll"]