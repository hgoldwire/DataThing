package com.showtime.datathing

import bi.ticket.data.IncorrectExpire1121_16014641
import bi.tmi.ingestion.scrapers.Scrappy
import bi.tmi.schema.UserEvent
import bi.tmi.subscription.activity.UserActivity
import cats.effect.Effect
import io.circe.syntax._
import org.apache.spark.sql.SparkSession
import org.apache.spark.{SparkConf, SparkContext}
import org.http4s.HttpService
import org.http4s.circe._
import org.http4s.dsl.Http4sDsl
import org.http4s.server.middleware._

import scala.util.Try

class DataThingService[F[_] : Effect] extends Http4sDsl[F] {

  import Codecs._

  lazy val data: Map[Int, (Seq[Scrappy], Seq[UserActivity], Seq[UserEvent])] = IncorrectExpire1121_16014641(spark).makeEvents

  val sparkConf = new SparkConf().
    setMaster("local[2]").
    setAppName("MySparkApp")

  val sc: SparkContext = new SparkContext(sparkConf)

  val spark = SparkSession.builder()
    .appName("DataThing")
    .config(sparkConf)
    .getOrCreate()

  val service: HttpService[F] = {
    HttpService[F] {

      case GET -> Root =>
        val stream = getClass.getResourceAsStream("/index.html")
        val lines = scala.io.Source.fromInputStream(stream).getLines
        Ok(lines.mkString("\n"))

      case GET -> Root / "users" =>
        Ok(data.asJson)

      case GET -> Root / "userId" / uid =>
        val userId = Try(uid.toInt).toOption

        val record = for {
          userId <- Try(uid.toInt).toOption
          d <- data.get(userId)
        } yield d

        record match {
          case None => Ok("{}".asJson)
          case Some(r) => Ok(recordToJson(r))
        }

    }
  }

  val corsService = CORS(service)


}
