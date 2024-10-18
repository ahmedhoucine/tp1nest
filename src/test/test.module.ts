import { Module } from '@nestjs/common';
import { TestService } from './test/test.service';
import { TestController } from './test/test.controller';

@Module({
  providers: [TestService],
  controllers: [TestController]
})
export class TestModule {}
