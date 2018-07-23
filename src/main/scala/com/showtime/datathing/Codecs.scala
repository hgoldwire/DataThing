package com.showtime.datathing

import java.sql.Timestamp

import bi.tmi.ingestion.scrapers.Scrappy
import bi.tmi.schema.UserEvent
import bi.tmi.subscription.activity.UserActivity
import io.circe.syntax._
import io.circe.{Encoder, Json}

object Codecs {

  implicit def recordToJson: Encoder[(Seq[Scrappy], Seq[UserActivity], Seq[UserEvent])] = new Encoder[(Seq[Scrappy], Seq[UserActivity], Seq[UserEvent])] {
    override def apply(r: (Seq[Scrappy], Seq[UserActivity], Seq[UserEvent])): Json = Map(
      "scraps" -> r._1.asJson,
      "activities" -> r._2.asJson,
      "events" -> r._3.asJson
    ).asJson
  }

  implicit def scrappyToJson: Encoder[Scrappy] = new Encoder[Scrappy] {
    override def apply(s: Scrappy): Json = Map(
      "source" -> s.source.asJson,
      "userId" -> s.userId.asJson,
      "dt" -> s.dt.asJson,
      "key" -> s.key.asJson,
      "value" -> s.value.toString.asJson
    ).asJson
  }

  implicit def timestampToJson: Encoder[Timestamp] = new Encoder[Timestamp] {
    override def apply(a: Timestamp): Json = Encoder.encodeString(a.toString)
  }

  implicit def activityToJson: Encoder[UserActivity] = new Encoder[UserActivity] {
    override def apply(ua: UserActivity): Json = Map(
      "dt" -> ua.dtTs.asJson,
      "activityType" -> ua.activityType.value.asJson,
      "billingType" -> ua.billingType.value.asJson,
      "platform" -> ua.platform.value.asJson,
      "payload" -> ua.payload.toString.asJson
    ).asJson
  }

  implicit def eventToJson: Encoder[UserEvent] = new Encoder[UserEvent] {
    override def apply(a: UserEvent): Json = Map(
      "attributed_date" -> a.attributed_date.asJson,
      "tve_user_id" -> a.tve_user_id.asJson,
      "billing_type" -> a.billing_type.asJson,
      "platform" -> a.platform.asJson,
      "partner" -> a.partner.asJson,
      "event" -> a.event.asJson,
      "event_date" -> a.event_date.asJson,
      "dt" -> a.dt.asJson,
      "product_id" -> a.product_id.asJson,
      "subscription_length" -> a.subscription_length.asJson,
      "add_on_name" -> a.add_on_name.asJson
    ).asJson
  }
}