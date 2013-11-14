package com.objectpartners.avatar

import org.glassfish.embeddable.GlassFishProperties
import org.glassfish.embeddable.GlassFishRuntime
/**
 * User: danielwoods
 * Date: 10/29/13
 */
class Main {
  static void main(args) {
    def glassfish = new GlassFishProperties().with {
      setPort "http-listener", 8080
      GlassFishRuntime.bootstrap().newGlassFish(it).with {
        start()
        it
      }
    }
    glassfish.commandRunner.run "deploy", args?.getAt(0)
  }
}
