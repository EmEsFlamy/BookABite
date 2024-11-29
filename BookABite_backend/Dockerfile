
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
USER app
WORKDIR /app
EXPOSE 8080
EXPOSE 8081

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src
COPY ["API/API.csproj", "API/"]
COPY ["DOMAIN/DOMAIN.csproj", "DOMAIN/"]
COPY ["INFRASTRUCTURE/INFRASTRUCTURE.csproj", "INFRASTRUCTURE/"]
COPY ["APPLICATION/APPLICATION.csproj", "APPLICATION/"]
RUN dotnet restore "./API/API.csproj"
COPY . .
WORKDIR "/src/."
RUN dotnet build "./API/API.csproj" -c $BUILD_CONFIGURATION -o /app/build

FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "./API/API.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "./API.dll"]