val Http4sVersion = "0.18.14"
val Specs2Version = "4.2.0"
val LogbackVersion = "1.2.3"

resolvers += Resolver.mavenLocal

lazy val root = (project in file("."))
  .settings(
    organization := "com.showtime",
    name := "datathing",
    version := "0.0.1-SNAPSHOT",
    scalaVersion := "2.11.7",
    libraryDependencies ++= Seq(
      "org.http4s"      %% "http4s-blaze-server" % Http4sVersion,
      "org.http4s"      %% "http4s-circe"        % Http4sVersion,
      "org.http4s"      %% "http4s-dsl"          % Http4sVersion,
      "org.specs2"     %% "specs2-core"          % Specs2Version % "test",
      "ch.qos.logback"  %  "logback-classic"     % LogbackVersion,
      "com.sho" % "bi-tmi" % "2.0.3"
    )


  )

dependencyOverrides += "com.fasterxml.jackson.core" % "jackson-core" % "2.9.1"
dependencyOverrides += "com.fasterxml.jackson.core" % "jackson-databind" % "2.9.1"
dependencyOverrides += "com.fasterxml.jackson.module" % "jackson-module-scala_2.11" % "2.9.1"


