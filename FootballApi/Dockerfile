# Use the official .NET SDK image for building
FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /app

# Copy project files and restore dependencies
COPY *.csproj ./
RUN dotnet restore

# Copy all files and build the app
COPY . ./
RUN dotnet publish -c Release -o out

# Use the official .NET runtime image for running the app
FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS runtime
WORKDIR /app
COPY --from=build /app/out ./

# Expose port 5105 for the API
EXPOSE 5105

# Use HTTP instead of HTTPS for the container environment
ENV ASPNETCORE_URLS=http://+:5105
ENV ASPNETCORE_ENVIRONMENT=Production

ENTRYPOINT ["dotnet", "FootballApi.dll"]
