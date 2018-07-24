package com.showtime.datathing

import bi.ticket.data.IncorrectExpire1121_16014641
import bi.tmi.ingestion.scrapers.Scrappy
import bi.tmi.schema.UserEvent
import bi.tmi.subscription.activity.UserActivity
import cats.effect.{Effect, IO}
import io.circe.syntax._
import org.apache.spark.sql.SparkSession
import org.apache.spark.{SparkConf, SparkContext}
import org.http4s.{HttpService, Request, StaticFile}
import org.http4s.circe._
import org.http4s.dsl.Http4sDsl
import org.http4s.headers.Location
import org.http4s.server.middleware._

import scala.util.Try

class DataThingService[F[_] : Effect] extends Http4sDsl[F] {

  import Codecs._

  lazy val data: Map[Int, (Seq[Scrappy], Seq[UserActivity], Seq[UserEvent])] = IncorrectExpire1121_16014641(spark).makeAll
    .mapValues(v => (v._1.sortBy(_.dt), v._2.toSeq.sortBy(_.dtTs.getTime)(Ordering[Long]), v._3.toSeq.sortBy(_.event_date.getTime)(Ordering[Long])))

  val sparkConf: SparkConf = new SparkConf().
    setMaster("local[2]").
    setAppName("MySparkApp")

  val sc: SparkContext = new SparkContext(sparkConf)

  val spark: SparkSession = SparkSession.builder()
    .appName("DataThing")
    .config(sparkConf)
    .getOrCreate()


  val service: HttpService[F] = {
    HttpService[F] {

      case req @ GET -> Root =>
        StaticFile.fromResource("/index.html", Some(req)).getOrElseF(NotFound())

      case GET -> Root / "users" =>
        Ok(data.asJson)

      case GET -> Root / "user" / uid =>
        val userId = Try(uid.toInt).toOption

        val record = for {
          userId <- Try(uid.toInt).toOption
          d <- data.get(userId)
        } yield d

        record match {
          case None => Ok("{}".asJson)
          case Some(r) => Ok(recordToJson(r))
        }

      case req @ GET -> path =>
        StaticFile.fromResource(path.toString, Some(req)).getOrElseF(NotFound())

    }
  }

  val corsService = CORS(service)


}
